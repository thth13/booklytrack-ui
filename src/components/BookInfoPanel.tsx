export default function BookInfoPanel({ info }: { info: any }) {
  return (
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
  );
}
