const notifications = [
  {
    id: 1,
    type: "reaction",
    user: {
      name: "Mark Webber",
      avatar: "avatar-mark-webber.webp",
      link: "#",
    },
    message: "reacted to your recent post",
    resource: {
      title: "My first tournament today!",
      link: "#",
    },
    date: "1m ago",
    read: false,
  },
  {
    id: 2,
    type: "follow",
    user: {
      name: "Angela Gray",
      avatar: "avatar-angela-gray.webp",
      link: "#",
    },
    message: "followed you",
    date: "5m ago",
    read: false,
  },
  {
    id: 3,
    type: "joinGroup",
    user: {
      name: "Jacob Thompson",
      avatar: "avatar-jacob-thompson.webp",
      link: "#",
    },
    message: "has joined your group",
    resource: {
      title: "Chess Club",
      link: "#",
    },
    date: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "message",
    user: {
      name: "Rizky Hasanuddin",
      avatar: "avatar-rizky-hasanuddin.webp",
      link: "#",
    },
    message: "sent you a private message",
    resource: {
      title:
        "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
      link: "#",
    },
    date: "5 days ago",
    read: true,
  },
  {
    id: 5,
    type: "comment",
    user: {
      name: "Kimberly Smith",
      avatar: "avatar-kimberly-smith.webp",
      link: "#",
    },
    message: "commented on your picture",
    resource: {
      title: "Image chess",
      link: "#",
      image: "image-chess.webp",
    },
    date: "1 week ago",
    read: true,
  },
  {
    id: 6,
    type: "reaction",
    user: {
      name: "Nathan Peterson",
      avatar: "avatar-nathan-peterson.webp",
      link: "#",
    },
    message: "reacted to your recent post",
    resource: {
      title: "5 end-game strategies to increase your win rate",
      link: "#",
    },
    date: "2 weeks ago",
    read: true,
  },
  {
    id: 3,
    type: "leftGroup",
    user: {
      name: "Anna Kim",
      avatar: "avatar-anna-kim.webp",
      link: "#",
    },
    message: "left the group",
    resource: {
      title: "Chess Club",
      link: "#",
    },
    date: "2 weeks ago",
    read: true,
  },
];

const createBaseNotification = ({
  index,
  user,
  date,
  read,
  title = "",
  content = "",
  picture = "",
}) => {
  let element = `
    <div
      class="notifications__item ${!read ? "notifications__item--unread" : ""}"
      id="notification-${index}" onClick="markNotificationAsRead(${index})">
      <img
        src="./assets/images/${user.avatar}"
        alt="${user.name}"
        class="notifications__picture"
      />
      <div class="notifications__content">
        <span class="notifications__topic">
          <a href="${user.link}" class="notifications__userlink">
            ${user.name}
          </a>
          ${title}
        </span>
        <span class="notifications__date">${date}</span>
        ${content}
      </div>
      ${picture}
    </div>
  `;

  return element;
};

const notificationTypes = {
  reaction: ({ message, resource, ...data }) => {
    const title = `
      ${message}
      <a href="${resource.link}" class="notifications__postlink">
        ${resource.title}
      </a>
    `;

    const element = createBaseNotification({ ...data, title });

    return element;
  },
  follow: ({ message, ...data }) => {
    const element = createBaseNotification({ ...data, title: message });
    return element;
  },
  joinGroup: ({ message, resource, ...data }) => {
    const title = `
      ${message}
      <a href="${resource.link}" class="notifications__grouplink">
        ${resource.title}
      </a>
    `;

    const element = createBaseNotification({ ...data, title });

    return element;
  },
  message: ({ message, resource, ...data }) => {
    const content = `
      <div class="notifications__message">
        <p>${resource.title}</p>
      </div>`;

    const element = createBaseNotification({
      ...data,
      title: message,
      content,
    });

    return element;
  },
  comment: ({ message, resource, ...data }) => {
    const picture = `
      <div class="notifications__postimage">
        <img
          src="./assets/images/${resource.image}"
          alt="${resource.title}"
        />
      </div>
    `;

    const element = createBaseNotification({
      ...data,
      title: message,
      picture,
    });
    return element;
  },
  leftGroup: ({ message, resource, ...data }) => {
    const title = `
      ${message}
      <a href="${resource.link}" class="notifications__grouplink">
        ${resource.title}
      </a>
    `;

    const element = createBaseNotification({ ...data, title });

    return element;
  },
};

const updateCount = () => {
  const notificationsCount = document.querySelector(".notifications__count");
  notificationsCount.innerText = notifications.reduce((acc, curr) => {
    if (!curr.read) return acc + 1;
    return acc;
  }, 0);
};

const renderNotificationList = () => {
  const notificationsList = document.querySelector(".notifications__list");
  notificationsList.innerHTML = notifications.reduce((acc, curr, index) => {
    const createNotification = notificationTypes[curr.type];
    const content = acc + createNotification({ index, ...curr });
    return content;
  }, "");
};

const markAllNotificationsAsRead = () => {
  notifications.forEach((n) => (n.read = true));
};

const markNotificationAsRead = (index) => {
  if (!notifications[index].read) {
    const element = document.querySelector(`#notification-${index}`);
    element.classList.remove("notifications__item--unread");

    notifications[index].read = true;

    updateCount();
  }
};

document
  .querySelector(".notifications__action")
  .addEventListener("click", () => {
    markAllNotificationsAsRead();
    updateCount();
    renderNotificationList();
  });

updateCount();
renderNotificationList();
