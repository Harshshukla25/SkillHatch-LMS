

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const RichTextEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: input.description || "", // Initialize with existing description
    onUpdate: ({ editor }) => {
      setInput((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  // 🔁 Sync external input.description changes into the editor (e.g. after fetch)
  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description || "", false); // false = don't emit onUpdate
    }
  }, [input.description, editor]);

  if (!editor) return null;

  return (
    <div className="border p-2 rounded space-y-2">
      <div className="flex gap-1 flex-wrap border-b pb-2 mb-2">
        <Button onClick={() => editor.chain().focus().toggleBold().run()} variant="outline" size="sm">B</Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} variant="outline" size="sm">I</Button>
        <Button onClick={() => editor.chain().focus().toggleUnderline().run()} variant="outline" size="sm">U</Button>
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()} variant="outline" size="sm">• List</Button>
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} variant="outline" size="sm">1. List</Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} variant="outline" size="sm">H1</Button>
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant="outline" size="sm">H2</Button>
        <Button onClick={() => editor.chain().focus().setParagraph().run()} variant="outline" size="sm">P</Button>
        <Button onClick={() => editor.chain().focus().setTextAlign("left").run()} variant="outline" size="sm">Left</Button>
        <Button onClick={() => editor.chain().focus().setTextAlign("center").run()} variant="outline" size="sm">Center</Button>
        <Button onClick={() => editor.chain().focus().setTextAlign("right").run()} variant="outline" size="sm">Right</Button>
      </div>

      <EditorContent editor={editor} className="min-h-[150px] p-2 border rounded" />
    </div>
  );
};

export default RichTextEditor;
