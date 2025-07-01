




function updateDateTime() {
            const now = new Date();
            
            // Format date
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateString = now.toLocaleDateString('en-US', options);
            
            // Format time with seconds
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            document.getElementById('dateDisplay').textContent = dateString;
            document.getElementById('timeDisplay').textContent = timeString;
        }
        
        // Update immediately and then every second
        updateDateTime();
        setInterval(updateDateTime, 1000);
        // -------------deafult prayer time we consider algeria as the base ------
        const salawat = ["Fajr","Dhuhr","Asr","Maghrib","Isha"]
        axios.get("https://api.aladhan.com/v1/timingsByCity?city=Algiers&country=Algeria&method=2").then(
            (response) => {
                let times = response.data.data.timings
                for ( let salat of salawat){   
                    let content = `     
                <div class="prayer">
                <h2 class="title">${salat}</h2>
                <h4 class="time">${times[salat]}</h4>
            </div>
               
                `
                document.getElementsByClassName("prayer-container")[0].innerHTML += content
                }

                document.getElementById("selectedCity").innerHTML = ''
                document.getElementById("selectedCity").innerHTML = `Algeria - Algiers`

                

            }
        ).catch(
             error => console.log(error)
        )
        function search(){
            let target = document.getElementById("cityInput").value
                //format is Country-City
            let [paye, cite] = target.split("-");
            document.getElementsByClassName("prayer-container")[0].innerHTML = ""
            const salawat = ["Fajr","Dhuhr","Asr","Maghrib","Isha"]
        axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${cite}&country=${paye}&method=2`).then(
            (response) => {
                let times = response.data.data.timings
                for ( let salat of salawat){   
                    let content = `     
                <div class="prayer">
                <h2 class="title">${salat}</h2>
                <h4 class="time">${times[salat]}</h4>
            </div>
               
                `
                
                document.getElementsByClassName("prayer-container")[0].innerHTML += content
                }

                document.getElementById("selectedCity").innerHTML = ''
                document.getElementById("selectedCity").innerHTML = `${paye} - ${cite}`

                

            }
        ).catch(
             error => console.log(error)
        )







        }
      







        