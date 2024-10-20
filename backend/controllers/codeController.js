const axios = require('axios');
const Code = require('../models/Code'); // Import the mongoose model

const executeCode = async (req, res) => {
  const { language, version, code } = req.body;

  // Debugging to log incoming request data
  console.log('Request received:', { language, version, code });

 
  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid code format or missing code',
    });
  }

  try {
    // Sending code execution request to Piston API
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language,
      version,
      files: [
        {
          name: 'main.py', // Use correct file extension for the language
          content: code,
        },
      ],
    });

    console.log('Piston API response:', response.data);

    // Extract stdout and stderr from the Piston API response
    const { stdout, stderr } = response.data.run;
    const output = stdout || stderr || 'No output received.';

    // Save the code execution result in MongoDB
    const savedCode = new Code({
      language,
      version,
      code,
      output,
    });
    await savedCode.save();

    // Send successful response with output
    res.json({ success: true, output });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error during code execution:', error.response?.data || error.message);

    // Return a proper error message
    res.status(500).json({
      success: false,
      error: error.response?.data || 'Execution failed',
    });
  }
};

module.exports = { executeCode };
