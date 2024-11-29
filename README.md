# **College Gigs**

#### **[Backend API DOCUMENTATION](https://documenter.getpostman.com/view/31033077/2s9YkgC5Hy)**

## Endpoints

### Authentication

#### Login as an Employer

- **Route:** `/loginFreelancer`
- **Method:** `POST`
- **Description:** Allows registered employers to log in.
- **Request Body:**
  - `email` (string): Employer's email
  - `password` (string): Employer's password

#### Login as a Freelancer

- **Route:** `/registerFreelancer`
- **Method:** `POST`
- **Description:** Allows registered freelancers to log in.
- **Request Body:**
  - `email` (string): Freelancer's email
  - `password` (string): Freelancer's password

#### Register as an Employer

- **Route:** `/api/auth/register/employer`
- **Method:** `POST`
- **Description:** Allows employers to create an account.
- **Request Body:**

- [x] `emp_name` employer name
- [x] `emp_email` employer email
- [x] `emp_pass` employer password
- [x] `emp_comp` employer company
- [x] `emp_fb` employer facebook
- [x] `emp_insta` employer instagram
- [x] `emp_linkedin` employer linkedin
- [x] `emp_page` employer page
- [x] `emp_address` employer address
- **Request File**
- [x] `emp_pfp` image file **name of input must be _emp_pfp_, form must have attribute _enctype="multipart/form-data"_**

#### Register as a Freelancer

- **Route:** `/api/auth/register/freelancer`
- **Method:** `POST`
- **Description:** Allows freelancers to create an account.
- **Request Body:**
- [x] `f_name` freelancer name
- [x] `f_age` freelancer age
- [x] `f_email` freelancer email
- [x] `f_password` freelancer password
- [x] `f_school` freelancer school
- [x] `f_level` freelancer school level
- [x] `f_course` freelancer college course
- [x] `f_portfolio` freelancer portfolio
- [x] `f_fb` freelancer facebook
- [x] `f_insta` freelancer instagram
- [x] `f_linkedin` freelancer linkedin
- [x] `f_twitter` freelancer twitter
- **Request File**
- [x] `f_pfp` image file **name of input must be _emp_pfp_, form must have attribute _enctype="multipart/form-data"_**

### Employer Operations

#### Update Employer Profile

- **Route:** `/updateEmployer`
- **Method:** `POST`
- **Description:** Allows the logged-in employer to update their profile details.
- **Request Body:**  
  _all fields are optional_
- [x] `emp_name` new employer name
- [x] `emp_comp` new employer company
- [x] `emp_fb` new employer facebook
- [x] `emp_insta` new employer instagram
- [x] `emp_linkedin` new employer
- [x] `emp_page` new employer page
- [x] `emp_pfp` new employer profile picture
- [x] `emp_address` new employer address
- **Request File:**
  _all fields are optional_
- [x] `emp_pfp` new profile picture

#### Hire Freelancer for Work

- **Route:** `hireFreelancer`
- **Method:** `POST`
- **Description:** Enables the employer to hire a freelancer for a specific work.
- **Query Parameters:** `work_id`

#### Delete Freelancer's Work

- **Route:** `deleteFreelancerWork`
- **Method:** `DELETE`
- **Description:** Allows the employer to delete a specific work assigned to a freelancer.
- **Query Parameters:** `work_id`
s
### Freelancer Operations

#### Get Freelancer Details

- **Route:** `/getFreelancerDetails`
- **Method:** `GET`
- **Description:** Retrieves details of the logged-in employer.
- **Query Parameters:** `id`

#### Update Freelancer Profile

- **Route:** `/updateFreelancer`
- **Method:** `POST`
- **Description:** Allows the logged-in freelancer to update their profile details.
- **Request Body:**
  _all fields are optional_
- [x] `f_name` new freelancer name
- [x] `f_age` new freelancer age
- [x] `f_school` new freelancer school
- [x] `f_level` new freelancer level
- [x] `f_course` new freelancer course
- [x] `f_portfolio` new freelancer portfolio
- [x] `f_fb` new freelancer facebook
- [x] `f_insta` new freelancer instagram
- [x] `f_linkedin` new frealancer linkedin
- [x] `f_twitter` new freelancer twitter
- **Request File:**
  _all fields are optional_
- [x] `f_pfp` new profile picture

#### Apply for Work

- **Route:** `/applyFreelancerWork`
- **Method:** `POST`
- **Description:** Enables the freelancer to apply for a specific work opportunity.
- **Request Body:**

- [x] `f_work`
- [x] `f_time`
- [x] f_sdate,
- [x] f_edate,
- [x] f_description,
- [x] f_price,
- [x] f_cname,
- [x] f_card,
- [x] f_expmonth,
- [x] f_expyear,
- [x]f_cvv

#### Get Freelancer's Works

- **Route:** `/getFreelancerWorks`
- **Method:** `GET`
- **Description:** Retrieves all works assigned to the logged-in freelancer.

### General Operations

#### Logout
- **Route:** `/logout`
- **Method:** `POST`
- **Description:** Logs the user out of the system by blacklisting the provided JWT token.
