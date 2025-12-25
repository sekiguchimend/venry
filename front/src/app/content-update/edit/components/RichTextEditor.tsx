"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

type Props = {
  value: string;
  onChange: (nextHtml: string) => void;
  placeholder?: string;
  minHeightPx?: number;
};

const RichTextEditor: React.FC<Props> = ({ value, onChange, placeholder = '', minHeightPx = 320 }) => {
  const [isSourceMode, setIsSourceMode] = useState(false);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    [placeholder]
  );

  const editor = useEditor({
    extensions,
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'ProseMirror tiptap-editor__content',
      },
    },
    onUpdate: ({ editor }) => {
      if (isSourceMode) return;
      onChange(editor.getHTML());
    },
  });

  // 外部valueが変わったら反映（同じ内容なら何もしない）
  useEffect(() => {
    if (!editor) return;
    if (isSourceMode) return;
    const current = editor.getHTML();
    if ((value || '') !== current) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [editor, value, isSourceMode]);

  if (!editor) {
    return (
      <div className="border border-gray-200 rounded bg-white">
        <div className="bg-gray-200 p-3 border-b border-gray-300 text-sm text-gray-600">読み込み中...</div>
        <div style={{ minHeight: `${minHeightPx}px` }} />
      </div>
    );
  }

  const can = {
    bold: editor.can().toggleBold(),
    italic: editor.can().toggleItalic(),
    underline: editor.can().toggleUnderline(),
    strike: editor.can().toggleStrike(),
    bullet: editor.can().toggleBulletList(),
    ordered: editor.can().toggleOrderedList(),
    quote: editor.can().toggleBlockquote(),
    undo: editor.can().undo(),
    redo: editor.can().redo(),
  };

  const isActive = {
    bold: editor.isActive('bold'),
    italic: editor.isActive('italic'),
    underline: editor.isActive('underline'),
    strike: editor.isActive('strike'),
    bullet: editor.isActive('bulletList'),
    ordered: editor.isActive('orderedList'),
    quote: editor.isActive('blockquote'),
    link: editor.isActive('link'),
  };

  const Button: React.FC<{
    label: React.ReactNode;
    title: string;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
  }> = ({ label, title, onClick, disabled, active }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 rounded border text-sm ${
        active ? 'bg-white border-gray-400 text-gray-900' : 'bg-gray-100 border-gray-300 text-gray-700'
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );

  const handleSetLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('リンクURL', prev || '');
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url.trim() }).run();
  };

  return (
    <div className="border border-gray-200 rounded overflow-hidden bg-white tiptap-editor">
      {/* ツールバー（スクショ寄せのグレー領域） */}
      <div className="bg-gray-200 p-3 border-b border-gray-300 flex flex-wrap gap-2 items-center">
        <Button
          title="ソース"
          label="ソース"
          active={isSourceMode}
          onClick={() => setIsSourceMode((v) => !v)}
        />

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button title="太字" label={<b>B</b>} active={isActive.bold} disabled={!can.bold || isSourceMode} onClick={() => editor.chain().focus().toggleBold().run()} />
        <Button title="斜体" label={<i>I</i>} active={isActive.italic} disabled={!can.italic || isSourceMode} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <Button title="下線" label={<span style={{ textDecoration: 'underline' }}>U</span>} active={isActive.underline} disabled={!can.underline || isSourceMode} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <Button title="取り消し線" label={<span style={{ textDecoration: 'line-through' }}>S</span>} active={isActive.strike} disabled={!can.strike || isSourceMode} onClick={() => editor.chain().focus().toggleStrike().run()} />

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button title="箇条書き" label="•" active={isActive.bullet} disabled={!can.bullet || isSourceMode} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <Button title="番号付き" label="1." active={isActive.ordered} disabled={!can.ordered || isSourceMode} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <Button title="引用" label="❝" active={isActive.quote} disabled={!can.quote || isSourceMode} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <Button title="リンク" label="🔗" active={isActive.link} disabled={isSourceMode} onClick={handleSetLink} />

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button title="元に戻す" label="↶" disabled={!can.undo || isSourceMode} onClick={() => editor.chain().focus().undo().run()} />
        <Button title="やり直し" label="↷" disabled={!can.redo || isSourceMode} onClick={() => editor.chain().focus().redo().run()} />
      </div>

      {/* 本文 */}
      {isSourceMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 text-sm outline-none"
          style={{ minHeight: `${minHeightPx}px` }}
        />
      ) : (
        <div style={{ minHeight: `${minHeightPx}px` }}>
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;


