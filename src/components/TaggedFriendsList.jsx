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
    <div className="bg-gray-800 rounded p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Tagged Friends:</h2>
      <ul className="divide-y divide-gray-700">
        {friendsList.map((friend) => (
          <li key={friend.name} className="py-2">
            <div className="flex items-center justify-between">
              <span className="text-white">{friend.name}</span>
              <span className="text-gray-400">({friend.count} times)</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaggedFriendsList;
