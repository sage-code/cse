
function populateSidebar() {
  const mainContent = document.querySelector('main');
  const topics = mainContent.querySelectorAll('h2, h3');
  const sidebarList = document.getElementById('sidebar-list');

  topics.forEach(topic => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    const checkbox = document.createElement('input');
    const topicId = topic.querySelector('a')?.id || topic.id;

    if (!topicId) return;

    // Checkbox setup
    checkbox.type = 'checkbox';
    checkbox.className = 'topic-check';
    checkbox.dataset.target = topicId;

    // Link setup
    link.href = `#${topicId}`;
    link.textContent = topic.textContent;

    // Append to list item
    listItem.appendChild(checkbox);
    listItem.appendChild(link);
    sidebarList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', populateSidebar);
