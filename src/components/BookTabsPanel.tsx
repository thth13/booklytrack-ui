'use client';

import { useEffect, useState } from 'react';
import { addBookSummmary, getBookSummary, removeSummaryItem } from '../lib/api';
import ReactQuill from 'react-quill-new';
import './style.css';
import { useUserProfile } from '../context/UserProfileContext';
import { getUserBookCategory } from '../lib/utils';
import { ReadCategory } from '../types';

interface BookTabsPanelProps {
  book: any;
}

export default function BookTabsPanel({ book }: BookTabsPanelProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'review' | 'quotes'>('summary');
  const [summary, setSummary] = useState<string[]>([]);
  const [summaryField, setSummaryField] = useState<string>('');
  const [isReadBook, setIsReadBook] = useState<ReadCategory | null>(null);
  const { profile } = useUserProfile();

  const addSummary = async (e: any) => {
    e.preventDefault();

    if (profile?.user) {
      addBookSummmary(profile?.user, book.id, summaryField);
    }
  };

  const handleDeleteSummary = async (indexToDelete: number) => {
    if (summary && profile?.user) {
      await removeSummaryItem(profile.user, book.id, indexToDelete);
      setSummary(summary.filter((_, idx) => idx !== indexToDelete));
    }
  };

  useEffect(() => {
    if (!book || !profile) return;

    getBookSummary(profile.user, book.id).then((data) => setSummary(data.summary));

    setIsReadBook(getUserBookCategory(profile, book.id));
  }, [book, profile]);

  return (
    profile &&
    isReadBook && (
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
                        <div className="summary-card" key={index}>
                          <span
                            className="summary-delete-btn"
                            onClick={() => handleDeleteSummary(index)}
                            title="Удалить"
                          >
                            ×
                          </span>
                          <div dangerouslySetInnerHTML={{ __html: item }} />
                        </div>
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
    )
  );
}
