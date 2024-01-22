// TaggedFriendsList.js
const TaggedFriendsList = ({ beerData }) => {
  // Function to process tagged friends from all items and return a sorted list
  const processTaggedFriends = () => {
    const allFriendsArray = beerData.flatMap((item) =>
      item.tagged_friends
        ? item.tagged_friends.split(',').map((friend) => friend.trim())
        : []
    );

    const friendCount = allFriendsArray.reduce((acc, friend) => {
      acc[friend] = (acc[friend] || 0) + 1;
      return acc;
    }, {});

    // Convert to array of objects
    const friendList = Object.keys(friendCount).map((friend) => ({
      name: friend,
      count: friendCount[friend],
    }));

    // Sort by count in descending order
    friendList.sort((a, b) => b.count - a.count);

    return friendList;
  };

  const friendsList = processTaggedFriends();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tagged Friends:</h2>
      <ul>
        {friendsList.map((friend) => (
          <li key={friend.name}>
            {friend.name} ({friend.count} times)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaggedFriendsList;
