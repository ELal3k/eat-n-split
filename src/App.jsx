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

  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend))
    setShowAddFriend(false)
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((f) =>
        f.id === selectedFriend.id ? { ...f, balance: f.balance + value } : f
      )
    )
    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleClick}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
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

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance < 0 && (
        <p className="green">
          {friend.name} owes you{"  "}
          {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even </p>}

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("")
  const [myExpense, setMyExpense] = useState("")
  const [payer, setPayer] = useState("user")
  const friendExpense = bill ? bill - myExpense : ""
  const billBalance = payer === "user" ? friendExpense : -myExpense

  function handleSubmit(e) {
    e.preventDefault()
    if (!bill || !myExpense) return
    onSplitBill(billBalance)
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♂️Your expense </label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />

      <label> 🕺🏻 {selectedFriend.name}`s expense </label>
      <input type="text" value={friendExpense} disabled />
      <label>🥲 Who`s paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}
