export const fetchData = (apiUrl) => {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }      
            return response.json();
        })
        .then(data => {
        //   apiData = data;
        
            return data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
  
    };

export const fetchData2 = async (apiUrl) => {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }      
            return response.json();
        })
        .then(data => {
        //   apiData = data;
        
            return data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    
    };

export const fetchDataWithToken = async (api , token) => {
    try {
        const response = await fetch(api, {
        headers: {
            "Authorization": `Token ${token}`, // Include the token in the request headers
        },
        });

        if (response.ok) {
        const data = await response.json();
        // document.getElementById("user-data").textContent = JSON.stringify(data, null, 2);
        return data
        } else {
        console.error("Failed to fetch user data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
    };


export const postData = (apiUrl,data) => {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(responseData => {
            // Handle the API response
            console.log(`Data successfully posted: ${JSON.stringify(responseData)}`);
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An error occurred while posting the data.');
        });
    };


export const postDataWithToken = (apiUrl,data,token) => {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(data),
        
    })
        .then(response => response.json())
        .then(responseData => {
            // Handle the API response
            console.log(`Data successfully posted: ${JSON.stringify(responseData)}`);
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('An error occurred while posting the data.');
        });
    };


export const updatePoint = ((api,point) => {
    fetch(api)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(itemData => {
        // Calculate the new quantity value
        const currentPoint = itemData.point;
        const updatedPoint = currentPoint + point;
    
        const currentNetPoint = itemData.net_point;
        const updatedNetPoint = currentNetPoint + point;
    
    
        // Create an object with the updated data
        const updatedData = {
            net_point: updatedNetPoint,
            point: updatedPoint,
            
        };
    
        // Send a PATCH request to update the item
        return fetch(api, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        console.log('Updated item:', data);
        })
        .catch(error => {
        console.error('Error:', error);
        });
    });



export const patchData = ((api,datatoupdate) => {
    fetch(api, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(datatoupdate),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data patched:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});