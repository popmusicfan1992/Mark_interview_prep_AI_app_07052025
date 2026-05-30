const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to modify this session" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Update session to include new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("session");

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    // Verify session ownership
    if (!question.session || question.session.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to modify this question" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a note for a question
// @route   POST /api/questions/:id/note
// @access  Private
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id).populate("session");

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    // Verify session ownership
    if (!question.session || question.session.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to modify this question" });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
