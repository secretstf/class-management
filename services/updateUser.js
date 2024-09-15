

const updateUser = async (userID, newUser) => {
    let response = await fetch(`/api/firebase/document?collection=users&id=${userID}`, {
        method: "POST",
        body: JSON.stringify(newUser),
    });

    if (response.status !== 200) {
        console.error("Error updating user");
    }
}

export { updateUser };