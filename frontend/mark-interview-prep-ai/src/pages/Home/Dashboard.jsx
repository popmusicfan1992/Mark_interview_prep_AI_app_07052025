import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const TEMPLATE_SESSIONS = [
  {
    id: "react-frontend",
    role: "React Frontend Developer",
    experience: "2",
    topicsToFocus: "React Hooks, Redux, Performance, CSS",
    description: "Sample interview preparation session for Frontend Developer.",
    icon: "💻",
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
    id: "node-backend",
    role: "Node.js Backend Developer",
    experience: "3",
    topicsToFocus: "Express.js, Event Loop, REST APIs, MongoDB, Middleware",
    description: "Sample interview preparation session for Backend Developer.",
    icon: "⚙️",
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
    id: "uiux-design",
    role: "UI/UX Designer",
    experience: "1",
    topicsToFocus: "User Research, Wireframing, Figma, Design Systems",
    description: "Sample interview preparation session for UI/UX Designer.",
    icon: "🎨",
    questions: [
      {
        question: "What is your process for conducting user research?",
        answer: "I start by defining target personas, creating interview scripts, conducting interviews or surveys, synthesizing findings using affinity maps, and translating insights into design requirements."
      },
      {
        question: "Explain the difference between UX and UI design.",
        answer: "UX (User Experience) focuses on the overall feel, usability, and user journey of the product. UI (User Interface) focuses on the visual presentation, styling, layout, typography, and interactive elements."
      },
      {
        question: "How do you handle developer handoff for design systems?",
        answer: "I structure design files in Figma, write detailed notes on interaction behavior, define tokens for colors/typography, export assets in correct formats, and schedule a handoff meeting to walk through the specs."
      }
    ]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [importingTemplate, setImportingTemplate] = useState(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const handleSeedSessions = async () => {
    try {
      setIsSeeding(true);
      const response = await axiosInstance.post(API_PATHS.SESSION.SEED);
      if (response.data && response.data.success) {
        toast.success("Tải dữ liệu mẫu thành công!");
        fetchAllSessions();
      }
    } catch (error) {
      console.error("Error seeding sessions:", error);
      toast.error("Không thể tải dữ liệu mẫu. Hãy thử lại!");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleImportTemplate = async (template) => {
    try {
      setImportingTemplate(template.id);
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role: template.role,
        experience: template.experience,
        topicsToFocus: template.topicsToFocus,
        description: template.description,
        questions: template.questions,
      });

      if (response.data?.session?._id) {
        toast.success(`Successfully imported ${template.role} template!`);
        fetchAllSessions();
      }
    } catch (error) {
      console.error("Error importing template:", error);
      toast.error("Failed to import template. Please try again.");
    } finally {
      setImportingTemplate(null);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        {sessions?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 bg-amber-50/10 border border-dashed border-amber-300 rounded-2xl py-12 mx-4 md:mx-0 shadow-xs">
            <div className="w-16 h-16 bg-amber-100/50 rounded-full flex items-center justify-center text-amber-500 mb-4 text-3xl font-bold">
              💡
            </div>
            <h3 className="text-xl font-semibold text-gray-800">No Interview Sessions Yet</h3>
            <p className="text-sm text-gray-600 max-w-md mt-2 mb-8">
              Start your interview preparation journey by creating a new AI-powered session, or select a template to load immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-3 rounded-full hover:bg-orange-600/10 hover:text-black border transition-all cursor-pointer flex items-center justify-center gap-2"
                onClick={() => setOpenCreateModal(true)}
              >
                Create New Session
              </button>
              <button
                className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-3 rounded-full hover:bg-black transition-all cursor-pointer shadow-md shadow-orange-200/50 flex items-center justify-center gap-2"
                onClick={handleSeedSessions}
                disabled={isSeeding}
              >
                {isSeeding ? <SpinnerLoader /> : "Load All Sample Data"}
              </button>
            </div>

            <div className="w-full mt-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
                Or Quick-Start with a Template:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-6xl mx-auto px-4">
                {TEMPLATE_SESSIONS.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 bg-amber-50/70 rounded-xl flex items-center justify-center text-xl mb-4 shadow-2xs">
                        {template.icon}
                      </div>
                      <h5 className="text-base font-bold text-gray-800 mb-1 leading-snug">
                        {template.role}
                      </h5>
                      <p className="text-[12px] text-gray-500 mb-3">
                        Experience: {template.experience} years
                      </p>
                      <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                      <div className="mb-6">
                        <span className="text-[11px] font-semibold text-gray-400 block uppercase mb-1.5">Focus Topics:</span>
                        <p className="text-xs text-gray-700 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100 inline-block font-medium">
                          {template.topicsToFocus}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleImportTemplate(template)}
                      disabled={importingTemplate !== null}
                      className="w-full bg-gray-50 text-xs text-amber-600 font-bold py-2.5 px-4 rounded-xl border border-amber-200/50 hover:bg-linear-to-r hover:from-[#FF9324] hover:to-[#e99a4b] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {importingTemplate === template.id ? (
                        <>
                          <SpinnerLoader /> Importing...
                        </>
                      ) : (
                        "Import Template"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick-Seed Banner to import 5+ templates easily */}
            <div className="bg-linear-to-r from-amber-50/70 to-orange-50/50 border border-amber-200/50 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs mx-4 md:mx-0">
              <div className="flex items-center gap-4">
                <span className="text-2xl">💡</span>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-gray-800">Want more practice sessions?</h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Instantly load 5+ pre-configured sample interview sessions (Python Data Science, Java Developer, DevOps, QA, and Mobile App Development).
                  </p>
                </div>
              </div>
              <button
                className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-xs font-bold text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all cursor-pointer shadow-xs whitespace-nowrap flex items-center justify-center gap-2"
                onClick={handleSeedSessions}
                disabled={isSeeding}
              >
                {isSeeding ? <SpinnerLoader /> : "Load 5+ Sample Sessions"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
              {sessions?.map((data, index) => (
                <SummaryCard
                  key={data?._id}
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))}
            </div>
          </div>
        )}

        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
