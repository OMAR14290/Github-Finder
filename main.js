

const input = document.querySelector("input");
const btn = document.querySelector("button");
const profile = document.querySelector(".profile");


btn.addEventListener("click", searchusername)


async function searchusername() {
    
    const searchvalue = input.value.trim();

    if(!searchvalue){
          alert("there is no username with this value")
          return
    }

    try {
        
           const response = await fetch(`https://api.github.com/users/${searchvalue}`);
            if (!response.ok) throw new Error("User not found");
           const data = await response.json();

           profile.innerHTML = `
           
                  <img src="${data.avatar_url}" alt="">
          <div>
          <h1>${data.name || data.login}</h1>
          <p>${data.bio || "No bio available"}</p>
          <a href="${data.html_url}" target="_blank">view profile</a>
          
          <ul>
            <li><span>${data.followers}</span> followers</li>
            <li><span>${data.following}</span> following</li>
            <li><span>${data.public_repos}</span> repo</li>
          </ul>
          </div>
           
           `

           if (data.message === "Not Found") {
             profile.innerHTML = "<h2>User not found</h2>";
             return;
}


    } catch (error) {
    console.error("Error fetching data:", error);
}
}