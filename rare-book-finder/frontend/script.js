const searchBooks = async () => {
    const input = document.getElementById('searchInput');
    const booksContainer = document.getElementById('booksContainer');
    
    // Clear previous results
    booksContainer.innerHTML = '';
    
    // Get search input
    const query = input.value;
    
    try {
        // Make a request to your backend
        const response = await fetch(`http://localhost:3001/search?query=${query}&type=title`);
        const books = await response.json();
        
        // Check for empty response
        if (books.length === 0) {
            booksContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        // Display books
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-item');
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Details: ${book.details}</p>
            `;
            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        booksContainer.innerHTML = '<p></p>';
    }
};

// Load top books on page load
document.addEventListener('DOMContentLoaded', searchBooks);
