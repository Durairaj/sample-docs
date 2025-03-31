# Documentation README

This project is a documentation site built to organize and display technical content across multiple sections. It uses a sidebar navigation system and supports nested sub-documents. This README provides instructions on how to configure the project and add new pages.

## Table of Contents
- [Documentation README](#documentation-readme)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
    - [Setting Up the Sidebar](#setting-up-the-sidebar)
    - [Base URL and Site Settings](#base-url-and-site-settings)
    - [Adding New Pages](#adding-new-pages)
      - [Step 1: Define the Section in the Data File](#step-1-define-the-section-in-the-data-file)
      - [Step 2: Create the Page File](#step-2-create-the-page-file)
        - [Conditions](#conditions)
      - [Step 3: Add Subdocuments (Optional)](#step-3-add-subdocuments-optional)
  - [Running the Site](#running-the-site)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby** (if using Jekyll): Version 2.5.0 or higher
- **Bundler**: Install with `gem install bundler`
- **Jekyll** (if applicable): Install with `gem install jekyll`
- **Node.js** (optional, for additional scripting): For any custom JS dependencies
- **Git**: For version control

You’ll also need basic knowledge of Markdown, YAML, and HTML/CSS.

## Project Structure

The project follows a typical static site structure with a focus on documentation:

```
project-root/
├── _config.yml           # Configuration file (e.g., for Jekyll)
├── _data/                # Data files for dynamic content
│   └── docs.yml          # Sidebar and section definitions
├── docs/                 # Documentation pages inside docs
│   ├── example-folder/
│   │   ├── menu1.md
│   │   └── menu2.md
├── css/                  # Stylesheets
│   └── main.css
├── js/                   # Custom JavaScript (if any)
└── README.md             # This file
```

- `_data/docs.yml`: Defines the sidebar navigation structure.
- `docs/`: Contains all Markdown files for pages and subdocuments.
- `_config.yml`: Global site configuration (e.g., base URL, title).

## Configuration

### Setting Up the Sidebar

The sidebar is generated dynamically from `_data/docs.yml`. Here’s an example of its structure:

```yaml
# _data/docs.yml
- title: First Menu Group Heading
  path: first_menu_group_folder/file_name
  docs:
  - title: first_menu_title
    path:  first_menu_group_folder/first_menu_file_name
  - title: second_menu_title
    path:  first_menu_group_folder/second_menu_file_name

- title: Second Menu Group Heading
  path: second_menu_group_folder/file_name
  docs:
  - title: first_menu_title
    path:  second_menu_group_folder/first_menu_file_name
  - title: second_menu_title
    path:  second_menu_group_folder/second_menu_file_name

- title: Nested Third Menu Group Heading
  path: third_menu_group_folder/file_name
  docs:
  - title: first_menu_title
    path: third_menu_group_folder/third_menu_group_nested_folder/nested_first_menu_file_name
    subdocs:
    - title: Nested first menu file name title
      path: third_menu_group_folder/third_menu_group_nested_folder/nested_first_menu_file_name
    - title: Nested second menu file name title
      path: third_menu_group_folder/third_menu_group_nested_folder/nested_second_menu_file_name
```

The sidebar HTML is rendered using Liquid templating. Ensure this file is updated whenever you add new sections or pages.

```yaml
title: The display name of the section or page.
path: The relative path to the page (used to generate URLs).
docs: A list of pages under the section.
subdocs: Nested subdocuments (optional).
```


### Base URL and Site Settings

Edit _config.yml to configure global settings:
```yaml

# _config.yml
title: My Documentation Site
description: A comprehensive guide to our technical ecosystem
baseurl: "" # e.g., "/docs" if hosted in a subdirectory
url: "https://example.com" # Replace with your domain
```


### Adding New Pages

#### Step 1: Define the Section in the Data File
To add a new section or page, update _data/docs.yml. For example, to add a "Security" section:

```yaml

- title: Security
  path: security/intro
  docs:
  - title: Intro
    path: security/intro
  - title: Best Practices
    path: security/best-practices
```

#### Step 2: Create the Page File
Create the corresponding Markdown files in the docs/ directory. For the "Security" section:

Create docs/security/intro.md:
```markdown

---
title: Security Intro
permalink: /docs/security/intro
---


This is the introduction to the Security section.

```
<br>

Create docs/security/best-practices.md:
```markdown

---
title: Best Practices
permalink: /docs/security/best-practices
---

Security best practices go here.
```

##### Conditions
```yaml
title: The page title.
permalink: The URL path (must match the path in _data/docs.yml).
```

####  Step 3: Add Subdocuments (Optional)
For nested subdocuments, add a subdocs field in _data/docs.yml and create the files. Example:

```yaml

- title: Security
  path: security/intro
  docs:
  - title: Policies
    path: security/policies
    subdocs:
    - title: Access Control
      path: security/subdocs/access-control
Create docs/security/subdocs/access-control.md:

```


```
---
title: Access Control
permalink: /docs/security/subdocs/access-control
---

Details about access control policies.
Ensure the directory structure matches the path (e.g., create security/subdocs/ if it doesn’t exist).

```

## Running the Site

The site is built with Jekyll and the [Jekyll Doc Theme](https://github.com/aksakalli/jekyll-doc-theme). To get started, make sure you have Ruby and gem and clone this repo. Then:

```bash
# install bundler
gem install bundler

# install packages
bundle install

# run jekyll with dependencies
bundle exec jekyll serve
```

