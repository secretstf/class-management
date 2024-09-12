const updateUsers = async (updatedUsers, changeLog) => {
    // go through changeLog and update the users in the backend
    for (const [key, value] of Object.entries(changeLog)) {
        // if the value is "DELETE", delete the user
        if (value === "DELETE") {
            // delete the user
            console.log(`Deleting user ${key}`);

            let response = await fetch(`/api/firebase/document?collection=users&id=${key}`, {
                method: "DELETE",
            });

            if (response.status !== 200) {
                console.error("Error deleting user");
            }
        } else {
            // update the user
            console.log(`Updating user ${key} with ${value}`);

            let response = await fetch(`/api/firebase/document?collection=users&id=${key}`, {
                method: "POST",
                body: JSON.stringify(updatedUsers[key]),
            });

            if (response.status !== 200) {
                console.error("Error updating user");
            }
        }
    }
}

export { updateUsers };