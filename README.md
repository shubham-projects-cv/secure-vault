# Secure Vault Application

## How to Run the Project

1. Ensure Node.js and npm are installed on your system.

2. Clone the repository and navigate into the project directory:
   ```bash
   git clone <repository-url>
   cd secure-vault
   ````

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```
   http://localhost:5173
   ```

---

## How to Use the Application

1. The application opens in a **locked state**.

2. Enter a **master password** to unlock the vault
   (this password is never stored).

3. Add a secret using the **Add Secret** form:

   * Name (required)
   * Username (required)
   * Password (required)
   * Notes (optional)

4. All secrets are **encrypted before being stored** in localStorage.

5. Refreshing the page **automatically locks** the vault.

6. Unlock again using the same master password to access saved secrets.

7. Use the **Copy** button to copy usernames or passwords
   (clipboard auto-clears after a short time).

8. Use the **Search** field to filter secrets.

9. Delete secrets using the **Delete** button
   (confirmation required).
