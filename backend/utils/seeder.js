const Session = require("../models/Session");
const Question = require("../models/Question");

const defaultSessions = [
  {
    role: "React Frontend Developer",
    experience: "2 years",
    topicsToFocus: "React Hooks, Redux, State Management, Performance, CSS",
    description: "Sample interview preparation session for Frontend Developer",
    questions: [
      {
        question: "What is the difference between Virtual DOM and Real DOM in React?",
        answer: "The Virtual DOM is a lightweight, in-memory representation of the Real DOM. React uses it to improve performance. When state changes, React updates the Virtual DOM first, compares it with the previous snapshot (diffing), and then batch-updates only the changed elements in the Real DOM (reconciliation)."
      },
      {
        question: "Explain the React Component Lifecycle and how useEffect replaces lifecycle methods.",
        answer: "In class components, we use componentDidMount, componentDidUpdate, and componentWillUnmount. In functional components, these are replaced by the useEffect hook. An empty dependency array [] mimics componentDidMount, returning a cleanup function mimics componentWillUnmount, and dependencies in the array [state, props] mimic componentDidUpdate."
      },
      {
        question: "How do you optimize performance in a React application?",
        answer: "Performance optimization can be achieved by: using React.memo for component memoization, useMemo/useCallback to cache values/callbacks, implementing lazy loading with React.lazy and Suspense, virtualizing long lists, and avoiding inline function definitions in render methods."
      }
    ]
  },
  {
    role: "Node.js Backend Developer",
    experience: "3 years",
    topicsToFocus: "Express.js, Event Loop, REST APIs, MongoDB, Middleware",
    description: "Sample interview preparation session for Backend Developer",
    questions: [
      {
        question: "What is the event loop in Node.js and how does it work?",
        answer: "The Event Loop allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It delegates tasks to the OS or thread pool (libuv). It runs in phases (timers, pending callbacks, idle/prepare, poll, check, close callbacks), executing callbacks once tasks complete."
      },
      {
        question: "What are Middlewares in Express and what are their typical use cases?",
        answer: "Middlewares are functions that have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle. Typical use cases include logging (Morgan), authentication/authorization, parsing bodies, and error handling."
      },
      {
        question: "How do you secure REST APIs in Node.js/Express?",
        answer: "Security practices include: using HTTPS, validating user input (Joi/express-validator), hashing passwords (bcryptjs), implementing JWT-based auth, setting security HTTP headers (helmet), enabling CORS with restricted origins, and setting rate limits to prevent brute-force attacks."
      }
    ]
  },
  {
    role: "Python Data Scientist",
    experience: "2 years",
    topicsToFocus: "Machine Learning, Pandas, NumPy, Scikit-Learn, Deep Learning",
    description: "Sample interview preparation session for Data Scientist and ML Engineer",
    questions: [
      {
        question: "What is the difference between supervised and unsupervised learning?",
        answer: "Supervised learning uses labeled training data, where the model learns to map inputs to a known target output (e.g., classification, regression). Unsupervised learning works with unlabeled data, finding hidden patterns, groupings, or structures within the data (e.g., K-means clustering, PCA)."
      },
      {
        question: "Explain the Bias-Variance tradeoff and how to address overfitting.",
        answer: "Bias is error from erroneous assumptions in the learning algorithm (underfitting). Variance is error from sensitivity to small fluctuations in the training set (overfitting). To reduce overfitting (high variance), we can use regularization (L1/L2), collect more data, simplify the model, or use cross-validation."
      },
      {
        question: "What is cross-validation and why is it used?",
        answer: "Cross-validation is a resampling method used to evaluate machine learning models on a limited data sample. The most common is K-Fold CV, where data is split into K subsets. The model is trained on K-1 subsets and validated on the remaining one, repeating K times. It prevents overfitting and yields a more accurate measure of model performance."
      }
    ]
  },
  {
    role: "DevOps Engineer",
    experience: "3 years",
    topicsToFocus: "Docker, Kubernetes, CI/CD Pipelines, AWS, Terraform, Linux",
    description: "Sample interview preparation session for Infrastructure and Cloud Engineer",
    questions: [
      {
        question: "What is the difference between a Container and a Virtual Machine?",
        answer: "Containers share the host operating system's kernel, making them lightweight, fast to start, and resource-efficient (e.g., Docker). Virtual Machines (VMs) run complete guest operating systems on virtualized hardware via a hypervisor, which requires more resources and has slower startup times."
      },
      {
        question: "Explain Kubernetes Pod, Deployment, and Service concepts.",
        answer: "A Pod is the smallest deployable unit in Kubernetes, representing a running process. A Deployment manages Pod creation, scaling, and rolling updates. A Service defines a logical set of Pods and a policy to access them, providing stable network IPs and load balancing."
      },
      {
        question: "What is Infrastructure as Code (IaC) and what are its benefits?",
        answer: "IaC is the managing and provisioning of infrastructure through machine-readable definition files (e.g., Terraform) rather than manual configuration. Key benefits include consistency, version control (Git), repeatability, fast deployments, and reduced human error."
      }
    ]
  },
  {
    role: "Java Spring Boot Developer",
    experience: "4 years",
    topicsToFocus: "Spring Boot, Microservices, Hibernate, REST APIs, JPA, Security",
    description: "Sample interview preparation session for Enterprise Java Developer",
    questions: [
      {
        question: "What is Dependency Injection in the Spring Framework?",
        answer: "Dependency Injection (DI) is a pattern where objects do not create their dependencies; instead, the Spring IoC (Inversion of Control) container injects them. This makes the code loosely coupled, highly testable, and easier to configure. Injection is typically done via Constructor, Setter, or Field (@Autowired)."
      },
      {
        question: "Explain the architecture of Spring Boot Microservices.",
        answer: "Spring Boot Microservices architecture splits an enterprise app into small, independent services communicating via lightweight protocols (REST, gRPC, Kafka). Key components include Eureka (Service Discovery), Spring Cloud Gateway (API Gateway), Config Server (Centralized Config), and Resilience4j (Circuit Breaker)."
      },
      {
        question: "What is Hibernate Lazy Loading and how do you avoid the N+1 select problem?",
        answer: "Lazy loading delays the initialization of a relationship/object until it is accessed. The N+1 select problem occurs when fetching an entity with lazy relationships, executing 1 query for the parent and N queries for associated children. It is resolved by using JOIN FETCH, EntityGraph, or Batch Fetching."
      }
    ]
  },
  {
    role: "QA Automation Engineer",
    experience: "2 years",
    topicsToFocus: "Selenium, Cypress, Test Automation, CI/CD Integration, API Testing",
    description: "Sample interview preparation session for Automation Test Engineer",
    questions: [
      {
        question: "Explain the Page Object Model (POM) design pattern in test automation.",
        answer: "POM is a design pattern where each web page is represented as a Class file. Page elements are defined as properties, and user actions on the page are defined as methods. This separates test logic from page locators, making test scripts highly reusable and easy to maintain when the UI changes."
      },
      {
        question: "What is the difference between Cypress and Selenium?",
        answer: "Selenium uses the WebDriver protocol to drive the browser externally, supporting multiple browsers and languages. Cypress executes tests directly inside the browser run-loop, providing faster execution, automatic waiting, and time-travel debugging, but is restricted to JavaScript/TypeScript."
      },
      {
        question: "What is the difference between smoke testing and regression testing?",
        answer: "Smoke testing validates that the critical, core functionalities of the build work correctly before starting extensive testing. Regression testing involves running a suite of tests to verify that new code changes or bug fixes have not broken or affected existing features."
      }
    ]
  },
  {
    role: "Mobile App Developer (React Native/Flutter)",
    experience: "3 years",
    topicsToFocus: "Cross-Platform Mobile, React Native, Dart, State Management, App Store",
    description: "Sample interview preparation session for Cross-Platform Mobile Engineer",
    questions: [
      {
        question: "Explain the difference between React Native and Flutter.",
        answer: "React Native uses JavaScript/React to compile components to native Android/iOS UI elements via a JS bridge or TurboModules. Flutter uses Dart and its own high-performance Skia/Impeller graphics engine to draw UI widgets directly on the screen, giving absolute UI consistency."
      },
      {
        question: "How do you manage state in a React Native or Flutter application?",
        answer: "In React Native, state is typically managed using Context API, Redux Toolkit, or lightweight libraries like Zustand. In Flutter, common state management patterns include Provider, Riverpod, BLoC (Business Logic Component), or simple ValueNotifier/StatefulWidget."
      },
      {
        question: "What are some strategies to optimize the performance of mobile apps?",
        answer: "Optimization strategies include: lazy-loading heavy lists (FlatList in RN, ListView.builder in Flutter), optimizing image assets (caching, WebP, responsive sizing), avoiding excessive rebuilds by memoization, using native thread pools for heavy computations, and reducing app bundle size."
      }
    ]
  }
];

const seedDefaultData = async (userId) => {
  try {
    const createdSessions = [];
    for (const s of defaultSessions) {
      const session = await Session.create({
        user: userId,
        role: s.role,
        experience: s.experience,
        topicsToFocus: s.topicsToFocus,
        description: s.description,
      });

      const questionIds = [];
      for (const q of s.questions) {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        questionIds.push(question._id);
      }

      session.questions = questionIds;
      await session.save();
      
      // Populate questions to return full session details
      const populatedSession = await Session.findById(session._id).populate("questions");
      createdSessions.push(populatedSession);
    }
    return createdSessions;
  } catch (error) {
    console.error("Seeding default data error:", error);
    throw error;
  }
};

module.exports = { seedDefaultData };
