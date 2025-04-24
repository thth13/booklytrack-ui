'use client';

import React, { useContext, useEffect, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import './style.css';
import { addBookSummmary, addBookToUserLibrary, getBookById, getBookSummary } from '@/src/lib/api';
import { AuthContext } from '@/src/context/AuthContext';
import { useUserProfile } from '@/src/context/UserProfileContext';
import { ReadCategory } from '@/src/types';
import { getUserBookCategory } from '@/src/lib/utils';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { profile } = useUserProfile();
  const userId = authContext?.userId;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<ReadCategory | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'review' | 'quotes'>('summary');
  const [summary, setSummary] = useState<string>('');
  const [summaryField, setSummaryField] = useState<string>('');

  const addBook = async () => {
    if (userId) {
      const bookForBackend = {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        authors: book.volumeInfo.authors,
        cover: book.volumeInfo.imageLinks.smallThumbnail,
        googleId: book.id,
        categories: book.volumeInfo.categories,
        publisher: book.volumeInfo.publisher,
        publishedDate: new Date(book.volumeInfo.publishedDate),
      };

      await addBookToUserLibrary(bookForBackend, userId, ReadCategory.READING);

      redirect('/');
    }
  };

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = (e.target.value as ReadCategory) || null;

    if (userId && currentCategory) {
      await addBookToUserLibrary(book, userId, newCategory, currentCategory);
      setCurrentCategory(newCategory);
    }
  };

  const addSummary = async (e: any) => {
    e.preventDefault();
    addBookSummmary(profile.user, book.id, summaryField);
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getBookById(id as string)
      .then((data) => setBook(data))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!book || !profile) return;
    setCurrentCategory(getUserBookCategory(profile, book.id));

    getBookSummary(profile.user, book.id)
      .then((data) => setSummary(data.summary))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [book, profile]);

  if (loading) return <div className="book-page-container">Loading...</div>;
  if (!book) return <div className="book-page-container">Book not found</div>;

  const info = book.volumeInfo;
  return (
    <div className="book-page-container new-design">
      <div className="book-header">
        <button className="book-page-btn" onClick={() => router.push('/')}>
          <span className="material-icons">home</span>
        </button>
        <button className="book-page-btn" onClick={() => router.back()}>
          <span className="material-icons">back</span>
        </button>
        {!currentCategory && (
          <button className="book-page-btn add" onClick={addBook}>
            Add book
          </button>
        )}
        {currentCategory && (
          <select
            className="book-page-btn book-page-category-select"
            value={currentCategory}
            onChange={handleCategoryChange}
          >
            <option value={ReadCategory.READING}>Reading</option>
            <option value={ReadCategory.FINISHED}>Finished</option>
            <option value={ReadCategory.WANTS_READ}>Wants to read</option>
            <option value="">Delete from library</option>
          </select>
        )}
      </div>
      <div className="book-main-content new-main-content">
        <div className="book-info-panel">
          <div className="book-cover-block">
            {info.imageLinks?.smallThumbnail ? (
              <img src={info.imageLinks.smallThumbnail} alt={info.title} className="book-cover-large" />
            ) : (
              <div className="book-cover-large" />
            )}
          </div>
          <div className="book-meta">
            <h1 className="book-title">{info.title}</h1>
            <div className="book-authors">
              <span className="meta-label">Authors:</span> {info.authors?.join(', ') || '—'}
            </div>
            <div className="book-publisher">
              <span className="meta-label">Publisher:</span> {info.publisher || '—'}
            </div>
            <div className="book-date">
              <span className="meta-label">Year:</span> {info.publishedDate || '—'}
            </div>
            <div
              className="book-description"
              dangerouslySetInnerHTML={{ __html: info.description || 'No description available.' }}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
}
