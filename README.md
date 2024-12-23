# To-Do List Application

This is a simple **To-Do List Application** that allows users to create, edit, delete, and mark tasks as completed. The application persists tasks in the browser's `localStorage` to ensure data is retained even after the page is refreshed.

## Features

- **Add Tasks**: Users can add tasks using the input field and "Add" button.
- **Edit Tasks**: Edit the text of existing tasks.
- **Delete Tasks**: Remove individual tasks or delete all tasks at once.
- **Mark Tasks as Completed**: Toggle the completion status of tasks by clicking on them.
- **Local Storage Integration**: Tasks are saved in the browser's `localStorage` to retain data.

## File Structure

- **HTML**: Basic structure and elements for the app.
- **CSS**: Styling for the to-do list and notifications.
- **JavaScript**: Handles app functionality, including task management and local storage interaction.

## How It Works

1. **Adding a Task**: 
   - Enter a task in the input field and click "Add."
   - The task is added to the list and saved in `localStorage`.

2. **Marking a Task as Completed**:
   - Click on a task to toggle its completion status.
   - Completed tasks are visually indicated by a line-through effect.

3. **Editing a Task**:
   - Click the "Edit" button next to a task to modify its text.
   - After editing, click "Save" to update the task.

4. **Deleting a Task**:
   - Click the "Delete" button next to a task to remove it.
   - Use the "Delete All" button to remove all tasks from the list and `localStorage`.

5. **Notifications**:
   - The app shows success notifications for task addition, deletion, editing, and status updates.

## Technologies Used

- **HTML**: Structure of the app.
- **CSS**: Styling and animations.
- **JavaScript**: Logic for task management and DOM manipulation.
- **Local Storage**: Data persistence.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/todo-list-app.git
