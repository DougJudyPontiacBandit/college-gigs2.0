const asyncHandler = require("express-async-handler");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connection = require("../config/dbConfig");

async function queryDatabase(query, values = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, function (error, results) {
      if (error) {
        console.error("Database error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const loginEmployer = asyncHandler(async (req, res) => {
  const { emp_email, emp_password } = req.body;

  let result = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_employer` where emp_email = ?",
    [emp_email]
  );

  if (result.length === 0) {
    return res.status(404).send("Email not found!");
  }
  const employer = result[0];
  const pass = employer.emp_pass;
  const passwordMatch = await bcrypt.compare(emp_password, pass);

  const { emp_password: _, ...filteredEmployer } = employer;

  if (!passwordMatch) {
    return res.status(401).send("Password do not match!");
  }

  let token = jwt.sign({ employer: filteredEmployer }, process.env.JWT_SECRET, {
    expiresIn: 86400 * 30,
  });

  res.status(200).json({ employer: filteredEmployer, token });
  return;
});

const loginFreelancer = asyncHandler(async (req, res) => {
  const { f_email, f_password } = req.body;

  let result = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_flancer` where f_email = ?",
    [f_email]
  );

  if (result.length === 0) {
    return res.status(404).send("Email not found!");
  }

  const freelancer = result[0];
  const pass = freelancer.f_password;
  const passwordMatch = await bcrypt.compare(f_password, pass);

  if (!passwordMatch) {
    return res.status(401).send("Password do not match!");
  }

  const { f_password: _, ...filteredFreelancer } = freelancer;

  let query = "SELECT * FROM `c_gigs_works` WHERE f_id = ?";
  const works = await queryDatabase(query, [freelancer.f_id]);

  let filteredworks = {};
  if (works.length > 0) {
    const { f_card, f_cvv, ...rest } = works[0];
    filteredworks = { ...rest };
  }

  let token = jwt.sign(
    { freelancer: filteredFreelancer },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400 * 30,
    }
  );

  return res
    .status(200)
    .json({ freelancer: filteredFreelancer, token, works: filteredworks });
});

const registerEmployer = asyncHandler(async (req, res) => {
  let {
    emp_name,
    emp_email,
    emp_pass,
    emp_comp,
    emp_fb,
    emp_insta,
    emp_linkedin,
    emp_page,
    emp_address,
  } = req.body;

  const filepath = req.file.path;

  const result = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_employer` where emp_email = ?",
    [emp_email]
  );
  if (result.length > 0)
    return res.status(409).send("email is already registered");

  const salt = bcrypt.genSaltSync(10);
  emp_pass = bcrypt.hashSync(emp_pass, salt);

  await queryDatabase(
    "INSERT INTO `c_gigs_s_up_employer` (emp_name, emp_email, emp_pass, emp_comp, emp_fb, emp_insta, emp_linkedin, emp_page, emp_pfp, emp_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      emp_name,
      emp_email,
      emp_pass,
      emp_comp,
      emp_fb,
      emp_insta,
      emp_linkedin,
      emp_page,
      filepath,
      emp_address,
    ]
  );

  return res.status(200).send("success");
});

const registerFreelancer = asyncHandler(async (req, res) => {
  let {
    f_name,
    f_age,
    f_email,
    f_password,
    f_school,
    f_level,
    f_course,
    f_portfolio,
    f_fb,
    f_insta,
    f_linkedin,
    f_twitter,
  } = req.body;

  const filepath = req.file.path;

  const result = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_flancer` where f_email= ?",
    [f_email]
  );

  if (result.length > 0)
    return res.status(409).send("This email already has an account registered");

  const salt = bcrypt.genSaltSync(10);
  f_password = bcrypt.hashSync(f_password, salt);

  await queryDatabase(
    "INSERT INTO `c_gigs_s_up_flancer` (f_name, f_age, f_email, f_password, f_school, f_level, f_course, f_portfolio, f_fb, f_insta, f_linkedin, f_twitter, f_pfp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      f_name,
      f_age,
      f_email,
      f_password,
      f_school,
      f_level,
      f_course,
      f_portfolio,
      f_fb,
      f_insta,
      f_linkedin,
      f_twitter,
      filepath,
    ]
  );

  return res.status(200).send("User successfully registered");
});

const applyFreelancerWork = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { f_id, f_name, f_email } = req.tokenData;

  let {
    f_work,
    f_time,
    f_sdate,
    f_edate,
    f_description,
    f_price,
    f_cname,
    f_card,
    f_expmonth,
    f_expyear,
    f_cvv,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  f_card = bcrypt.hashSync(f_card, salt);
  f_cvv = bcrypt.hashSync(f_cvv, salt);

  const query =
    "INSERT INTO `c_gigs_works` (f_id, f_name, f_email, f_work, f_time, f_sdate, f_edate, f_description, f_price, f_cname, f_card, f_expmonth, f_expyear, f_cvv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const result = await queryDatabase(query, [
    f_id,
    f_name,
    f_email,
    f_work,
    f_time,
    f_sdate,
    f_edate,
    f_description,
    f_price,
    f_cname,
    f_card,
    f_expmonth,
    f_expyear,
    f_cvv,
  ]);
  if (result.length >= 0) {
    return res.status(400).send("Something went wrong");
  }

  return res.status(200).send("Successfully applied");
});

const deleteFreelancerWork = asyncHandler(async (req, res) => {
  const work_id = req.query.work_id;

  let query = "DELETE FROM `c_gigs_works` WHERE w_id = ? AND f_id = ?";
  const result = await queryDatabase(query, [work_id, req.tokenData.f_id]);

  if (result.affectedRows <= 0) {
    return res.status(400).send("Work not found");
  }

  return res.status(200).send("Successfully deleted work");
});

const getFreelancerWorks = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM `c_gigs_works`";

  const works = await queryDatabase(query);

  return res.status(200).json({ "Freelancer works": works });
});

const hireFreelancer = asyncHandler(async (req, res) => {
  const work_id = req.query.work_id;
  const { emp_id } = req.tokenData;

  const query =
    "UPDATE `c_gigs_works` SET emp_id = ? WHERE w_id = ? AND emp_id = ?";

  const result = await queryDatabase(query, [emp_id, work_id, 0]);

  if (result.affectedRows <= 0) {
    return res.status(400).send("Something went wrong");
  }

  return res.status(200).send("Successfully hired freelancer");
});

const updateEmployer = asyncHandler(async (req, res) => {
  const {
    emp_name,
    emp_comp,
    emp_fb,
    emp_insta,
    emp_linkedin,
    emp_page,
    emp_pfp,
    emp_address,
  } = req.body;

  const emp_id = req.tokenData.emp_id;

  let filepath;

  if (req.file) {
    filepath = req.file.path;
  }

  const result = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_employer` WHERE emp_id = ?",
    [emp_id]
  );

  if (result.length === 0) return res.status(409).send("Employer not found!");

  const queryColumns = [];
  const queryValues = [];

  if (emp_name) {
    queryColumns.push("emp_name = ?");
    queryValues.push(emp_name);
  }
  if (emp_comp) {
    queryColumns.push("emp_comp = ?");
    queryValues.push(emp_comp);
  }
  if (emp_fb) {
    queryColumns.push("emp_fb = ?");
    queryValues.push(emp_fb);
  }
  if (emp_insta) {
    queryColumns.push("emp_insta = ?");
    queryValues.push(emp_insta);
  }
  if (emp_linkedin) {
    queryColumns.push("emp_linkedin = ?");
    queryValues.push(emp_linkedin);
  }
  if (emp_page) {
    queryColumns.push("emp_page = ?");
    queryValues.push(emp_page);
  }
  if (emp_pfp) {
    queryColumns.push("emp_pfp = ?");
    queryValues.push(emp_pfp);
  }
  if (emp_address) {
    queryColumns.push("emp_address = ?");
    queryValues.push(emp_address);
  }

  if (filepath !== null && filepath !== undefined) {
    queryColumns.push("emp_pfp = ?");
    queryValues.push(filepath);
  }

  queryValues.push(emp_id);

  let query = "UPDATE `c_gigs_s_up_employer` SET ";
  query += queryColumns.join(", ");
  query += " WHERE emp_id = ?";

  if (queryColumns.length === 0) {
    return res.status(400).send("No valid fields to update");
  }

  await queryDatabase(query, [...queryValues, emp_id]);

  const employer = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_employer` WHERE emp_id = ?",
    [emp_id]
  );
  const { emp_pass, ...filteredEmployer } = employer[0];
  let token = jwt.sign({ employer: filteredEmployer }, process.env.JWT_SECRET, {
    expiresIn: 86400 * 30,
  });
  return res.status(200).json({ employer: filteredEmployer, token });
});

const updateFreelancer = asyncHandler(async (req, res) => {
  const {
    f_name,
    f_age,
    f_school,
    f_level,
    f_course,
    f_portfolio,
    f_fb,
    f_insta,
    f_linkedin,
    f_twitter,
  } = req.body;

  const f_id = req.tokenData.f_id;
  let filepath;

  if (req.file) {
    filepath = req.file.path;
  }

  const queryColumns = [];
  const queryValues = [];

  if (f_name) {
    queryColumns.push("f_name = ?");
    queryValues.push(f_name);
  }
  if (f_age) {
    queryColumns.push("f_age = ?");
    queryValues.push(f_age);
  }
  if (f_school) {
    queryColumns.push("f_school = ?");
    queryValues.push(f_school);
  }
  if (f_level) {
    queryColumns.push("f_level = ?");
    queryValues.push(f_level);
  }
  if (f_course) {
    queryColumns.push("f_course = ?");
    queryValues.push(f_course);
  }
  if (f_portfolio) {
    queryColumns.push("f_portfolio = ?");
    queryValues.push(f_portfolio);
  }
  if (f_fb) {
    queryColumns.push("f_fb = ?");
    queryValues.push(f_fb);
  }
  if (f_insta) {
    queryColumns.push("f_insta = ?");
    queryValues.push(f_insta);
  }
  if (f_linkedin) {
    queryColumns.push("f_linkedin = ?");
    queryValues.push(f_linkedin);
  }
  if (f_twitter) {
    queryColumns.push("f_twitter = ?");
    queryValues.push(f_twitter);
  }

  if (filepath !== null && filepath !== undefined) {
    queryColumns.push("f_pfp = ?");
    queryValues.push(filepath);
  }

  queryValues.push(f_id);

  let query = "UPDATE `c_gigs_s_up_flancer` SET ";
  query += queryColumns.join(", ");
  query += " WHERE f_id = ?";

  if (queryColumns.length === 0) {
    return res.status(400).send("No valid fields to update");
  }

  await queryDatabase(query, [...queryValues, f_id]);

  const freelancer = await queryDatabase(
    "SELECT * FROM `c_gigs_s_up_flancer` WHERE f_id = ?",
    [f_id]
  );
  const { f_password, ...filteredFreelancer } = freelancer[0];
  let token = jwt.sign(
    { freelancer: filteredFreelancer },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400 * 30,
    }
  );

  return res.status(200).json({ freelancer: filteredFreelancer, token });
});

const logout = asyncHandler(async (req, res) => {
  let { authorization } = req.headers;

  const token = authorization.split(" ")[1];

  const query = "INSERT INTO `token_blacklist` (token) VALUES (?)";
  await queryDatabase(query, [token]);

  return res.status(200).send("Loggged out successfully");
});

const deleteFreelancerAccount = asyncHandler(async (req, res) => {
  const { f_id } = req.tokenData;
  let query = "DELETE FROM `c_gigs_s_up_flancer` WHERE f_id = ?";
  await queryDatabase(query, [f_id]);

  let { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  query = "INSERT INTO `token_blacklist` (token) VALUES (?)";
  await queryDatabase(query, [token]);

  return res.status(200).send("Deleted account");
});

const deleteEmployerAccount = asyncHandler(async (req, res) => {
  const { emp_id } = req.tokenData;
  let query = "DELETE FROM `c_gigs_s_up_employer` WHERE emp_id = ?";
  await queryDatabase(query, [emp_id]);

  let { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  query = "INSERT INTO `token_blacklist` (token) VALUES (?)";
  await queryDatabase(query, [token]);

  return res.status(200).send("Deleted account");
});

const getFreelancer = asyncHandler(async (req, res) => {
  const f_id = req.query.f_id;

  const query = "SELECT * FROM `c_gigs_s_up_flancer` WHERE f_id = ?";
  const freelancer = await queryDatabase(query, [f_id]);

  const { f_password: _, ...filteredFreelancer } = freelancer[0];
  return res.status(200).json(filteredFreelancer);
});

const getEmployer = asyncHandler(async (req, res) => {
  const emp_id = req.query.emp_id;
  const query = "SELECT * FROM `c_gigs_s_up_employer` WHERE emp_id = ?";
  const employer = await queryDatabase(query, [emp_id]);

  const { emp_pass: _, ...filteredEmployer } = employer[0];

  return res.status(200).json(filteredEmployer);
});

module.exports = {
  queryDatabase,
  loginEmployer,
  loginFreelancer,
  registerEmployer,
  registerFreelancer,
  applyFreelancerWork,
  deleteFreelancerWork,
  getFreelancerWorks,
  hireFreelancer,
  updateEmployer,
  updateFreelancer,
  logout,
  deleteFreelancerAccount,
  deleteEmployerAccount,
  getFreelancer,
  getEmployer,
};
