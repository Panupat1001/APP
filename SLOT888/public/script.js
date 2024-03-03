const socket = io();

const messagesList = document.getElementById('messages');
const typingIndicator = document.getElementById('typing-indicator');
const messageInput = document.getElementById('message-input');

messageInput.addEventListener('input', () => {
    socket.emit('typing');
});

messageInput.addEventListener('blur', () => {
    socket.emit('stopTyping');
});

socket.on('typing', (userId) => {
    // console.log("typing", userId )
    const typingUser = document.getElementById(userId);
    if (!typingUser) {
        const listItem = document.createElement('li');
        listItem.textContent = userId+' is typing...';
        listItem.id = userId;
        typingIndicator.appendChild(listItem);
    }
});

socket.on('stopTyping', (userId) => {
    const typingUser = document.getElementById(userId);
    if (typingUser) {
        typingUser.remove();
    }
});


const getCurrentDateTime = () => {
    const currentTime = new Date();
  
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const day = currentTime.getDate().toString().padStart(2, '0');
  
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
  

const chatContainer = document.getElementById('chat-container-messages');

// Function to scroll to the end of the chat container
const scrollToBottom = () => {
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

socket.on('chatMessage', ( { message, socketId } ) => {
    console.log(message,socket.id, socketId);
  
    if( message != "" ){
        const listItem = document.createElement('li');

        // Add a different class for user messages
        const messageTypeClass = socketId === socket.id ? 'user-message direct-chat-msg right' : 'other-message direct-chat-msg';
        // const messageTypeClass = 'user-message direct-chat-msg right';
      
        // Use innerHTML to include custom HTML structure
        listItem.innerHTML = `
                                <div class="${messageTypeClass}">
                                    <div class="direct-chat-infos clearfix">
                                        <span class="direct-chat-name float-left">${ socketId }</span>
                                        <span class="direct-chat-timestamp float-right">${ getCurrentDateTime() }</span>
                                    </div>
                                    <img class="direct-chat-img" src="AdminLTE/dist/img/slot.jpg" alt="Message User Image">
                                    <div class="direct-chat-text">
                                        ${ (message) }
                                    </div>                                
                                </div>`;
        
        messagesList.appendChild(listItem);
    }
    
    typingIndicator.innerHTML = ''; // Clear typing indicators when a new message is received
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

messageInput.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        const message = messageInput.value;
        socket.emit('stopTyping');
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
});
