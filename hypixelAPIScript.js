const raw = document.getElementById("raw");

// Define the API endpoint
const apiUrl = 'https://api.hypixel.net/v2/skyblock/bazaar';


// Function to fetch data from the API
async function fetchBazaarData() {
    try {
        // Make the GET request
        const response = await fetch(apiUrl);
        var flipListOrdered = [];
        
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        Object.keys(data.products).forEach(keys => {
            const item = data.products[keys];
            const profit = item.quick_status.buyPrice - item.quick_status.sellPrice;
            if (item.quick_status.sellPrice < 10000000 && profit < 20000000 && item.quick_status.buyMovingWeek > 30 && item.quick_status.sellMovingWeek > 30) {
                flipListOrdered.push({key: profit, id:item.product_id});
            }
        });
        flipListOrdered.sort((a, b) => b.key - a.key);

        // Log the data to the console (or handle it as needed)
        console.log('Bazaar Data: ', data);
        console.log(flipListOrdered);
        raw.innerHTML = 'Bazaar Data: <br>';
        for (let i = 0; i < 20; i++) {
            raw.innerHTML += '#' + (i+1) + ': id = ' + flipListOrdered[i].id + '   profit = ' + flipListOrdered[i].key + '<br>';
        }
         

        // Example of accessing specific data
        // console.log('Items:', data.bazaar ? data.bazaar.items : 'No items data available');

    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching Bazaar data:', error);
    }
}

// Call the function to fetch the data



