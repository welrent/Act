'use client';

import { useState, useEffect } from 'react';
import "./../../editor-styles.css";

export default function SiteTextEditor() {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      setPages(data);
      if (data.length > 0) {
        handleSelectPage(data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to load pages", error);
      setStatus({ type: 'error', message: 'Failed to load pages.' });
      setLoading(false);
    }
  }

  function handleSelectPage(page: any) {
    setSelectedPage(page);
    setContent(page.content || '');
    setStatus({ type: '', message: '' });
  }

  async function handleSave() {
    if (!selectedPage) return;
    setSaving(true);
    setStatus({ type: 'loading', message: 'Saving changes...' });

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedPage.id, content })
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Changes saved successfully!' });
        // Update local pages state
        setPages(pages.map(p => p.id === selectedPage.id ? { ...p, content } : p));
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save changes. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#8C8C91]">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1 className="editor-title">Site Text Editor</h1>
        <button 
          className="save-button"
          onClick={handleSave}
          disabled={saving || !selectedPage}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="editor-main">
        <div className="page-list">
          <div className="content-label mb-2">Pages</div>
          {pages.map((page) => (
            <div 
              key={page.id}
              className={`page-item ${selectedPage?.id === page.id ? 'active' : ''}`}
              onClick={() => handleSelectPage(page)}
            >
              {page.title}
            </div>
          ))}
        </div>

        <div className="editor-content-area">
          <div className="flex justify-between items-center">
            <div className="content-label">Content (HTML Supported)</div>
            {selectedPage && (
              <div className="text-[12px] text-[#8C8C91]">
                Editing: <strong>{selectedPage.title}</strong>
              </div>
            )}
          </div>
          
          <textarea
            className="html-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter page content here..."
          />

          {status.message && (
            <div className={`status-msg ${
              status.type === 'error' ? 'text-red-500' : 
              status.type === 'success' ? 'text-green-500' : 
              'text-[#8C8C91]'
            }`}>
              {status.message}
            </div>
          )}

          <div className="mt-4">
            <div className="content-label mb-2">Live Preview</div>
            <div 
              className="preview-box p-6 border border-[#F4F5F6] rounded-lg prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
