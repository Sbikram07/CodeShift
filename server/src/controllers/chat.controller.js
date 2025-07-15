require('dotenv').config()

const {GoogleGenerativeAI}=require("@google/generative-ai");



const genAI=new GoogleGenerativeAI(process.env.GEMINI_API)

exports.generateChat=async function (req,res) {
    try {
        const {inputLang ,outputLang, code}=req.body;
        if(!inputLang || !outputLang || !code){
            return res.status(401).json({
                message:"inputLang, outputLang, and code are required.",
            });

        }
        res.setHeader("Content-Type","text/event-stream")
        res.setHeader("Cache-Control","no-cache")
        res.setHeader("Connection","keep-alive")

        const model=genAI.getGenerativeModel({
            model:"gemini-2.5-pro"
        })
       const prompt = `
Convert the following ${inputLang} code to ${outputLang}. 
Only return the equivalent code block wrapped inside triple backticks (e.g., \`\`\`${outputLang}\n<code>\n\`\`\`):
after each end of line of code attach \n FLAG without any comment
### Code:
\`\`\`${inputLang}
${code}
\`\`\`
`;
        // const result=await model.generateContentStream(prompt)
        // for await (const chunk of result.stream){
        //     const text=chunk.text();
        //     res.write(`data:${text}\n\n`);
        // }
        // res.write(`event:done\ndata:end\n\n`);
        // res.end()

         const result = await model.generateContentStream(prompt);

 
    res.write(`data:__CODE_START__\n\n`);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      res.write(`${text}\n\n`);
    }

  //strting of code 
    res.write(`data:__CODE_END__\n\n`);

    // end of the code 
    res.write(`event:done\ndata:end\n\n`);
    res.end();
    }catch(err){
        console.log(err);
        
        res.status(500).json({
            error:err.message
        })
    }
    
}