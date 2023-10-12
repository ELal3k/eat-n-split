import { useState } from "react"
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]
function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend])
    setShowAddFriend(false)
  }
  function handleClick() {
    setShowAddFriend((prev) => !prev)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleClick}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill />}
    </div>
  )
}

export default App

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  )
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you{"  "}
          {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button>Select</Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [newFriendName, setNewFriendName] = useState("")
  const [newFriendImage, setNewFriendImage] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!newFriendName || !newFriendImage) return
    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name: newFriendName,
      image: `${newFriendImage}?u=${id}`,
      balance: 0,
    }
    onAddFriend(newFriend)
    setNewFriendName("")
    setNewFriendImage("https://i.pravatar.cc/48")
    console.log(newFriend)
  }

  return (
    <div>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label> 👬Friend Name</label>
        <input
          type="text"
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
        />
        <label> 🌄Image URL</label>
        <input
          type="text"
          onChange={(e) => setNewFriendImage(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  )
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰Bill Value</label>
      <input type="text" />

      <label>🧍‍♂️Your expense </label>
      <input type="text" disabled />

      <label> 🕺🏻 X`s expense </label>
      <input type="text" />
      <label>🥲 Who`s paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}
