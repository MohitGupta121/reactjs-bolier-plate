export const TRANSLATIONS_EN = {
  welcome: 'Welcome to the tutorial',
  header: {
    title: 'Waste Not 2.0',
    menu: {
      help: 'Help',
      myDashboard: 'My Dashboard',
      myAccount: 'My Account',
      logout: 'Log out',
    },
  },
  login: {
    title: 'LOG INTO WASTE NOT',
    emailLabel: 'Login email',
    emailPlaceholder: 'name@email.com',
    passwordLabel: 'Password',
    btnLabel: 'Log in',
  },
  accountSetup: {
    title: 'SET UP YOUR ACCOUNT',
    description:
      'Welcome! A Waste Not 2.0 account has been created for you. Please enter the password you would like to use. Your login email is: ',
    alreadyHaveAnAccount: 'Already have an account?',
    loginHere: 'Log in here',
  },
  dashboard: {
    title: 'Global Admin Dashboard',
    backToDashboard: 'Back to dashboard',
    globalAdmin: {
      title: 'GLOBAL ADMIN',
    },
    organizationAdmin: {
      name: '[Organization name] Management',
      pageTitle: 'management',
      details:
        'An Organization Admin can add/edit Entities within the Organization, manage Entity Admin Users, and view all Organization & Entity level waste data.',
      title: 'Manage [Organization name]',
      organizationAdminAccess: 'ORGANIZATION ADMIN ACCESS',
      manageTxt:
        'Add/manage Entities within the Organization and Entity Admin Users. View all Organization & Entity level waste data.',
    },
    entityAdmin: {
      title: 'MANAGE [UNITS]',
      alertMsg: '1 [Unit] needs to be set up',
      name: '[ENTITY NAME] DASHBOARD',
      pageTitle: 'management',
      details:
        'Manage settings and User permissions for this Entity and all of its [Units]. Invite Program Admins to help manage the [Units]. View [Unit] level waste data.',
      manageTags: 'MANAGE TAGS',
      setting: 'SETTINGS & ADMINS',
      entityAdminAccess: 'ENTITY ADMIN ACCESS',
      manageTxt: 'Manage settings and User permissions for each Entity.',
      manageTxt1:
        'Manage settings and User permissions for each Entity. View all waste data.',
    },
    programAdmin: {
      name: '[Entity Name] Management',
      details:
        'Program Admins manage [Unit] level settings & Users, edit some Entity settings, and view all [Entity] & [Unit] level waste data.',
      manageContainer: 'Manage Containers',
      title: 'Manage [Units]',
      alertMsg: '1 [Unit] needs to be set up',
    },
    user: {
      name: '[UNIT NAME] MANAGEMENT',
      pageTitle: 'management',
      details:
        'Build and manage Kitchens and Tracking Profiles for this [Unit]. View [Unit] level waste data.',
      details1:
        'Build and manage Kitchens and Tracking Profiles for each [Unit]. View all Entity & [Unit] level waste data.',
      kitchenAndProfile: 'KITCHENS & PROFILES',
    },
    manageProgram: {
      title: 'Manage Program',
      hoverText:
        'View/add/edit Organizations & Entities Invite/delete Admin Users',
    },
    containerLibrary: {
      title: 'Container Library',
      alertMsg: '{{count}} pending container requests',
    },
    globalUsers: {
      title: 'Global users',
      subtitle: 'Manage Global Admin Permissions',
    },
    analyticsDashboard: {
      title: 'Analytics Dashboard',
      subtitle: 'View global waste data',
    },
  },
  manageOrganization: {
    title: 'Manage Organization',
  },
  manageProgram: {
    title: 'Manage Program',
    searchPlaceHolder: 'Search Entities or Admins',
    addNewOrganizationTitle: 'Add new organization',
    saveAndExit: 'Save & Exit',
    backLink: 'Back to',
  },
  addOrganization: {
    nameAlreadyExist: 'The organization name has been already taken',
    organizationNameLabel: 'New Organization Name',
    organizationAdminLabel: 'Organization Admins',
    createBtnText: 'Create organization & Invite admin',
    cancelBtnText: 'Cancel',
  },
  validationMsg: {
    newPassword: {
      enter: 'Please enter your password',
      required: 'Password is required',
      minEight: 'Password must contain at least 8 characters',
      maxLength: 'Password must not exceed 25 characters',
      regex:
        'Password must have 1 number, 1 uppercase, 1 lowercase and 1 special character.',
    },
    confirmPassword: {
      required: 'Please confirm your password',
      noMatch: 'Passwords do not match',
    },
    userType: {
      required: 'Please select user type',
    },
    firstName: {
      shouldBeString: 'First name must be strings',
      required: 'First name is required',
      max: 'less than 50 characters!',
      onlyAlphabets: 'First name must contains alphabets only',
    },
    lastName: {
      shouldBeString: 'Last name must be strings',
      required: 'Last name is required',
      max: 'less than 50 characters!',
      onlyAlphabets: 'Last name must contains alphabets only',
    },
    companyName: {
      shouldBeString: 'Company name must be strings',
      required: 'Company name is required',
      max: 'less than 50 characters!',
    },
    cinNo: {
      shouldBeString: 'Please enter your CIN',
      required: 'CIN is required',
      min: 'CIN must contain at least 21 characters',
      maxLength: 'CIN must not exceed 21 characters',
      regex: 'Invalid CIN format',
    },
    mobileNo: {
      shouldBeString: 'Please enter your mobile number',
      required: 'Mobile number is required',
      min: 'Mobile number Should contain only 10 digits',
      max: 'Mobile number Should contain only 10 digits',
      regex: 'Mobile number Should contain only 10 digits',
    },
    mcaRegisteredEmail: {
      shouldBeString: 'Enter email',
      valid: 'Enter valid email',
      required: 'Email id is required',
      unique: 'Please provide a unique email.',
      regex: 'Invalide email format',
    },
    companyAdreess: {
      shouldBeString: 'Company Adreess  must be strings',
      required: 'Company adreess is required',
      max: 'less than 50 characters!',
    },
    zipCode: {
      shouldBeString: 'Please enter zip code',
      required: 'Zip code is required',
      min: 'Zip code must contain at least 6 characters',
      regex: 'Invalid Zip code format',
    },
    iecNumber: {
      shouldBeString: 'Please enter iec number',
      required: 'IEC number is required',
      min: 'IEC number must contain at least 10 characters',
      max: 'IEC number should not exceed 10 characters',
      regex: 'Invalid IEC number format',
    },
    panNumber: {
      shouldBeString: 'Please enter Company PAN number',
      required: 'PAN number is required',
      min: 'PAN number must contain at least 10 characters',
      max: 'PAN number not exceed 10 characters',
      regex: 'Invalid PAN format/Alfabet must be have uppercase only',
    },
    gstiNumber: {
      shouldBeString: 'Please enter GSTIN number',
      required: 'GSTIN number is required',
      min: 'GSTIN number must contain at least 15 characters',
      max: 'GSTIN number not exceed 15 characters',
      regex: 'Invalid GSTIN format/Alfabet must be have uppercase only',
    },
    userLength: {
      min: 'At least one user is required',
    },
    language: {
      required: 'Language is required',
    },
    entity: {
      name: {
        required: 'Entity name is required',
        max: 'Name must be less than 50 characters',
        onlyAlphabets: 'Entity Name must contains alphabets only',
      },
    },
    organization: {
      name: {
        required: 'Organization name is required',
        max: 'Name must be less than 50 characters',
        onlyAlphabets: 'Organization Name must contains alphabets only',
      },
    },
    locationLabel: {
      required: 'This field is required',
      onlyAlphabets: 'Should contains alphabets and space only',
      noNumber: 'Numbers not allowed',
      max: 'Max 25 characters allowed',
    },
    createCategory: {
      name: {
        required: 'Name is required',
      },
    },
    financialCodes: {
      number: 'Code must be a number',
      required: 'Finanicial Code is required',
    },
    generalSettings: {
      required: 'This field is required',
      url: {
        regex: 'Should be a valid link',
      },
    },
    updateUnit: {
      required: 'This field is required',
      zipCode: {
        regex: 'Invalid zip code',
      },
    },
    tags: {
      name: {
        required: 'Tag name is required',
        unique: 'Tag name should be unique',
        regex: 'Tag Name must contains alphabets only',
      },
      displayName: {
        required: 'Display name is required',
        onlyNumberAllowed: 'Only number allowed',
        unique: 'Number already exists for this entity',
      },
    },
    defaultContainer: {
      required: 'This field is required',
    },
  },
  entityList: {
    tableHeader: {
      entity: 'ENTITY',
      entityAdmin: 'ENTITY ADMINS',
      viewAnalyticsDashboard: 'VIEW ANALYTICS DASHBOARD',
    },
    establishedDate: 'EST:',
    addNewEntity: 'ADD NEW ENTITY',
  },
  entitySetup: {
    title: 'HOW DOES WASTE NOT COLLECT DATA? FROM THE BOTTOM UP!',
    introduction: {
      title: 'WASTE NOT 2.0',
      description:
        'Before you start tracking waste, you will need to set global preferences for each Entity. Once that is complete, you’ll build a Tag library to allow targeted filtering of waste data, add individual Units within the Entity, and invite Program Admins to help manage the Units. Click “Let’s Get Started” to take a tour of how Waste Not collects waste data before beginning the set-up process.',
    },
    tablets: {
      title: 'Tablets',
      description: '',
      startTxt:
        'Throughout the day, Team Members input waste data into the system ',
      boldDescrption: 'AS IT OCCURS ',
      endTxt:
        'using Tablets stationed at convenient locations in every Kitchen. Our streamlined input process means it takes less than 15 seconds to log an instance of waste.',
    },
    profiles: {
      title: 'PROFILES',
      description:
        'Each Tablet is linked to a Profile that has been customized with waste entry options specific to that location, including:',
      list: {
        list1:
          'Available waste containers (such as 18qt camber or 4qt hotel pan)',
        list2:
          'Types of waste being tracked (such as overproduction or trim waste)',
        list3:
          'Waste destinations (such as composting or feeding hungry people)',
      },
    },
    kitchens: {
      title: 'KITCHENS',
      description:
        'Profiles are created and customized by a chef or manager for their Kitchen, allowing the physical source of any waste to be automatically identified as it is entered into the system.',
    },
    units: {
      title: '',
      description:
        'Kitchens are grouped within a single location where one client is served. Each of these locations will be added individually and managed by an Entity Admin or Program Admin.',
      inputTitle: 'What do you call these locations (i.e. Complex or Unit)*',
      singular: 'singular',
      plural: 'plural',
    },
    masterDb: {
      title: 'waste data',
      description:
        'Waste data from all [Units] is compiled into a master database that updates in real time. Each waste entry is automatically tagged with the source [Unit], Kitchen, Profile, and Tablet.',
    },
    tags: {
      headerTitle:
        'HOW DO YOU FILTER AND ANALYZE WASTE DATA? USING CUSTOM TAGS!',
      title: 'Tags',
      description1:
        'Tags are a crucial tool for organizing and identifying waste above the [Unit] level, allowing you to filter and analyze data based on any metrics that are important to your program.',
      description2:
        'In the next steps, you’ll start building your Tag library. Once created, Tags are then assigned to each [Unit] and all waste entered into the system by a [Unit] is automatically labelled with its assigned Tags.',
    },
    entityName: {
      tablet: 'tablet',
      team: 'team',
      profile: 'profile',
      kitchen: 'kitchen',
      analyticsReport: 'ANALYTICS REPORTS',
      filterDataWithTags: 'FILTER DATA WITH CUSTOM TAGS',
      masterDb: 'MASTER DATABASE',
    },
    financialCode: {
      title: 'ASSOCIATING FINANCIAL CODES',
      description:
        'Waste data does not need to be associated with Financial Codes but it may be helpful for estimating costs associated with food waste. Every accounting structure is different so these associations are customizable for your entity. Please think this through carefully as once these associations are made, they cannot be changed for your entity.',
      config: {
        yesBtnTxt: 'yes',
        noBtnTxt: 'no',
        tableHeader: {
          associateTxt: 'Associate this level with a Financial Code?',
          costCenterTxt:
            'What do you call this level’s Financial Code (i.e. Cost Center)?',
        },
        unit: {
          title: '[Unit]',
          description:
            'Financial Codes are required by default for the [Unit] level.',
        },
        kitchen: {
          title: 'KITCHEN',
          description:
            'If you have multiple Financial Codes per [Unit] it will be helpful to associate Kitchens with their own Financial Codes. Multiple Kitchens may be associated with the same Financial Code.',
        },
        profile: {
          title: 'PROFILE',
          description:
            'If within a physical Kitchen you have multiple Financial Codes it will be helpful to associate Profiles with their own Financial Codes. Multiple Profiles may be associated with the same Financial Code.',
        },
        tags: {
          title: 'TAGS',
          description:
            'You will have the option to associate Tags with Financial Codes when building the Tag library.',
        },
      },
    },
    generalSettings: {
      header: 'General Settings',
      locationwiseMeasurment: 'What we call our locations? *',
      submitButton: 'Next',
      primaryDropdown: {
        label: 'Primary Language *',
      },
      secondaryDropdown: {
        label: 'Secondary Language (optional)',
      },
      measurmentDropdown: {
        label: 'Measurment Units *',
      },
      linkGenerator: {
        email: {
          label: 'Email Address',
          placeholder: 'name@gmail.com',
        },
        customLink: {
          label: 'Custom Link',
          placeholder: 'www.helpcenter.com',
        },
      },
      generalSettingHelp: {
        help: 'Where should users go for help ? *',
        helpDirection:
          'When a user selects HELP for [ENTITY] where should they be directed?',
      },
      singularUnit: {
        singular: 'Singular',
      },
      pluralUnit: {
        plural: 'Plural',
      },
    },
    defaultContainer: {
      pageTitle: 'Select default variation',
      description:
        'Choose the brand of this container most commonly used within your Entity. This variation will be the default option when [Unit] Users are creating Tracking Profiles (all other variations will still be available for them to select if they use a different brand).',
      renameContainer:
        'You can rename the container to a more recognizable name used within your Entity.',
      containerDetails: {
        defaultSelect: 'Default',
        brand: 'Brand',
        volume: 'Volume',
      },
    },
  },
  unitSetup: {
    introduction: {
      description:
        'Before you can start tracking waste, you will need to set up your tracking hierarchy by creating Kitchens and building Tracking Profiles. Click “Let’s Get Started” to take a tour of how Waste Not collects waste data before beginning the set-up process.',
    },
    profiles: {
      description:
        'Each Tablet is linked to a Profile that has been customized with waste tracking options specific to that location, including:',
    },
    kitchens: {
      description:
        'Profiles are created and customized by you, the [Unit] User, for your Kitchens, allowing the physical source of any waste to be automatically identified as it is entered into the system.',
    },
    units: {
      title: '',
      description:
        'Kitchens are grouped within a single [Unit] where one client is served. Each of these [Units] are added and managed by your Entity or Program Admin.',
      inputTitle: '',
    },
  },
  manageTags: {
    title: 'MANAGE TAGS',
    description: {
      para1:
        'Tags are organized into Categories to group them by type, like “Region” or “Client.” Each Category created here becomes a drop-down menu on the analytics dashboard, allowing users to filter waste data and run customized reports (see an example HERE).',
      para2:
        'Start by creating desired Categories, then add appropriate Tags to each (Tags can also be added when creating [Units]). Choose to require a Financial Code for a Category only if your entity associates Financial Code with the Tags that will go in that Category.',
    },

    noRecord: 'No record found',
  },
  addTagsDialog: {
    title: 'next: start building your tag library',
    description: {
      para1:
        'Tags allow you to filter and view waste data by any metric that is important to your program such as District, Client, or Business Type.',
      para2:
        'Once Tags are created, they are assigned to [Units] and any waste entered into a tablet at a [Unit] will automatically be labelled with its Tags, allowing users to run targeted reports on the analytics dashboard.',
    },
    btnText: 'start adding tags',
  },
  deleteCategory: {
    title: 'delete this category?',
    link: 'delete category',
    description:
      'This action cannot be undone. All tags in this category will also be removed. This will not delete any waste data.',
    deleteBtnTxt: 'delete',
    cancelBtnTxt: 'Cancel',
  },
  addUnit: {
    addAUnit: 'Add A [Unit]',
    pageTitle:
      'Add a [Unit] that will be tracking waste data, then assign Tags and invite [Unit] Users.',
    placeholder: '[Unit] name...',
    buttons: {
      addBtn: 'Add',
      exitSetup: 'Exit Setup',
      next: 'Next',
      saveAndExit: 'Save & Exit',
    },
  },
  containerLibrary: {
    buttonTooltip:
      'Using pre-set containers is crucial for Waste Not’s proprietary weight estimation feature. Chefs setting up Waste Not in their Kitchen will select a set of container options from this list that Team Members then match to the physical container holding kitchen waste when inputting a waste incident. This library should include all containers and brands used by your entire organization, giving Chefs a broad but accurate list to choose from.',
    searchBoxPlaceholder: 'Search',
    imgAlt: 'container-img ',
    backLink: 'Back',
    entity: {
      title: 'Waste Containers',
      details:
        'Click a container to select the default brand/variation for your Entity. Request new containers that are not included in the library.',
      addNew: 'Request new container',
      addBtn: 'Request container',
      nextBtn: 'next',
      hoverBtnTitle1: 'change default',
      hoverBtnTitle2: 'select default',
    },
    global: {
      title: 'Waste Container Library',
      imperial: 'Imperial',
      metric: 'Metric',
      addNew: 'Add new container',
      addBtn: 'Add container',
      hoverBtnTitle: 'Edit container',
    },
  },
  pendingInvite: {
    btnTitle: 'Close',
    organization: 'you’ve been added as organization admin for:',
    entity: 'you’ve been added as entity admin for:',
    user: 'you’ve been added as a user for:',
  },
  assignTags: {
    title: 'Assign tags',
    description:
      'Tags allow you to filter data and run customized reports on this [Unit’s] waste data. Select the appropriate Tag for this [Unit] from each of the Categories below:',
    nextBtn: 'next',
    saveAndExit: 'save & exit',
  },
  inviteUsers: {
    title: 'Invite users',
    description:
      'Invite Users to this [Unit]. Users will build and manage Kitchens and Tracking Profiles within this [Unit]. They will also be able to view all waste data from this [Unit].',
  },
  reviewDetails: {
    description: 'Review details of this [Unit] and edit as needed.',
    details: 'Details',
    tags: 'tags',
    users: 'users',
    saveAndNext: 'SAVE & ADD ANOTHER [UNIT]',
    exit: 'EXIT SETUP',
  },
  unitManagement: {
    title: '[Unit] Management',
    description:
      'Manage [Unit] settings and Users and view [Unit] level waste data.',
    addBtn: 'add a [Unit]',
    manageBtn: 'Manage tags',
  },
};
