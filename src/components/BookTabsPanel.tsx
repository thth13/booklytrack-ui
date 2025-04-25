import { useEffect, useState } from 'react';
import { addBookSummmary, getBookSummary } from '../lib/api';
import ReactQuill from 'react-quill-new';

interface BookTabsPanelProps {
  book: any;
  profile: any;
  setBook: any;
  setLoading: any;
}

export default function BookTabsPanel({ book, profile, setBook, setLoading }: BookTabsPanelProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'review' | 'quotes'>('summary');
  const [summary, setSummary] = useState<string>('');
  const [summaryField, setSummaryField] = useState<string>('');

  const addSummary = async (e: any) => {
    e.preventDefault();
    addBookSummmary(profile.user, book.id, summaryField);
  };

  useEffect(() => {
    if (!book || !profile) return;

    getBookSummary(profile.user, book.id)
      .then((data) => setSummary(data.summary))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [book, profile]);

  return (
    <div className="book-tabs-panel">
      <div className="book-tabs-header">
        <button
          className={`book-tab-btn${activeTab === 'summary' ? ' active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button
          className={`book-tab-btn${activeTab === 'quotes' ? ' active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          Quotes
        </button>
      </div>
      <div className="book-tabs-content">
        {activeTab === 'summary' && (
          <div>
            <div className="summary-view">
              <strong>Summary:</strong>
              <div className="summary-content">
                {Array.isArray(summary) ? (
                  <div className="summary-cards">
                    {summary.map((item, index) => (
                      <div className="summary-card" key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                ) : (
                  <p>{summary || 'No summary yet.'}</p>
                )}
              </div>
            </div>
            <div className="summary-editor">
              <strong>Add summary:</strong>
              <ReactQuill value={summaryField} onChange={setSummaryField} theme="snow" />
              <button className="save-summary-btn" onClick={addSummary}>
                Save summary
              </button>
            </div>
          </div>
        )}
        {activeTab === 'quotes' && (
          <div>
            <p>No quotes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
