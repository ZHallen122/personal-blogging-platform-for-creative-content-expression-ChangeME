import React, { useState, useRef, useEffect, FC, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image as ImageIcon,
  Eraser,
} from "lucide-react";

interface TextEditorProps {
  /**
   * The initial HTML content for the editor.
   */
  value?: string;
  /**
   * Callback fired when the content inside the editor changes.
   */
  onChange?: (content: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ value = "", onChange }) => {
  const [content, setContent] = useState<string>(value);
  const editorRef = useRef<HTMLDivElement>(null);

  // Update editor content if the external value prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      setContent(value);
    }
  }, [value]);

  // Executes a document command for formatting.
  const handleCommand = (command: string, optionValue?: string) => {
    try {
      document.execCommand(command, false, optionValue);
      editorRef.current?.focus();
    } catch (error) {
      console.error(`Error executing command '${command}':`, error);
    }
  };

  // Handler for inserting an image via prompt.
  const handleInsertImage = () => {
    const url = window.prompt("Enter the image URL:");
    if (url) {
      handleCommand("insertImage", url);
    }
  };

  // Clears formatting from the selected text.
  const handleClearFormatting = () => {
    handleCommand("removeFormat");
  };

  // Update local content state and trigger onChange callback when editor content changes.
  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const htmlContent = e.currentTarget.innerHTML;
    setContent(htmlContent);
    if (onChange) {
      onChange(htmlContent);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto my-4"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center space-x-2 p-2 bg-gray-100 rounded-t-lg overflow-x-auto">
        <button
          type="button"
          onClick={() => handleCommand("bold")}
          title="Bold"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("italic")}
          title="Italic"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("underline")}
          title="Underline"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <Underline size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("insertUnorderedList")}
          title="Bullet List"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("insertOrderedList")}
          title="Ordered List"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={handleInsertImage}
          title="Insert Image"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <ImageIcon size={16} />
        </button>
        <button
          type="button"
          onClick={handleClearFormatting}
          title="Clear Formatting"
          className="flex items-center justify-center rounded px-2 py-1 bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
        >
          <Eraser size={16} />
        </button>
      </div>
      {/* Editable Content Area */}
      <div
        ref={editorRef}
        onInput={handleInput}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Blog post editor"
        className="min-h-[200px] border border-gray-300 p-4 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia text-[16px] text-[#2c3e50] overflow-auto"
      />
    </motion.div>
  );
};

export default TextEditor;