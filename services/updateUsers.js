const updateUsers = async (updatedUsers, changeLog) => {
    // go through changeLog and update the users in the backend
    for (const [key, value] of Object.entries(changeLog)) {
        // if the value is "DELETE", delete the user
        if (value === "DELETE") {
            // delete the user
            await fetch(`/api/firebase/document?collection=users&id=${key}`, {
                method: "DELETE",
            }).then(async(response) => {
                if (response.status !== 200) {
                    console.error("Error deleting user from firebase");
                    return;
                }

                await fetch(`/api/clerkUser?id=${key}`, {
                    method: "DELETE",
                }).then((response) => {
                    if (response.status !== 200) {
                        console.error("Error deleting clerk user");
                    }
                });
            });

            
        } else {
            // update the user
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