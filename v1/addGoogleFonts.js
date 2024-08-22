/*----------------------------------------------------
    
    addGoogleFonts: a plugin that quickly imports
    Google Fonts with all available styles
    (i.e. italic & bold weight variants)
    
    * Author: HT (@ht-devx)
    * MIT License: usage and modification allowed
      with attribution.
    
    github.com/ht-devx/addGoogleFonts

----------------------------------------------------*/

window.addGoogleFonts = (googleFontsList) => {
	if(typeof googleFontsList !== "undefined"){
		if(googleFontsList.trim() !== ""){
			let gFontsArray = []; // user input (specifies which fonts)
			let okFontsArray = []; // names of all fonts that exist from the selection
			let finalFontsArray = []; // stylesheet-ready string for that font

			googleFontsList = googleFontsList.replaceAll(",,",",").replaceAll(", ",",").replaceAll(" ,",",").replaceAll(" , ",",");

			// capitalize first letter
			let temp = googleFontsList.split(" ");
			for(let i=0; i<temp.length; i++){
				temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
			}

			googleFontsList = temp.join(" ");

			/*-------------------------*/

			// if the string contains ","
            // assume there are multiple fonts to load
			if(googleFontsList.indexOf(",") > -1){
				if(googleFontsList.slice(-1) == ","){
					googleFontsList = googleFontsList.slice(0,-1);
				}

				gFontsArray = googleFontsList.split(",");
			}

			// if string doesn't contain ","
			// assume that it's just one singular font
			else {
				gFontsArray.push(googleFontsList);
			}

			/*-------------------------*/

			// once stuff is cleaned, replace all spaces with +
			for(let i=0; i<gFontsArray.length; i++){
				gFontsArray[i] = gFontsArray[i].trim().replaceAll(" ","+");
			}

			/*-------------------------*/

			// check gfonts sheet [1/2]
			if(!document.querySelector("link[rel='preconnect'][href*='//fonts.googleapis.com']")){
				let pcjso = document.createElement("link");
				pcjso.rel = "preconnect";
				pcjso.href = "https://fonts.googleapis.com";
				document.head.append(pcjso)
			}

			// check gfonts sheet [2/2]
			if(!document.querySelector("link[rel='preconnect'][href*='//fonts.gstatic.com'][crossorigin]")){
				let hfthf = document.createElement("link");
				hfthf.rel = "preconnect";
				hfthf.href = "https://fonts.gstatic.com";
				hfthf.crossOrigin = "";
				document.head.append(hfthf);
			}

			/*-------------------------*/

			let wghts = [100,200,300,400,500,600,700,800,900];

			for(let font of gFontsArray){
				let avail = [];

				// see if the font exists first
				fetch(`https://fonts.googleapis.com/css2?family=${font}`)
				.then(r => {
					okFontsArray.push(font);

					// get all weights, regardless of response
					for(let wght of wghts){
						fetch(`https://fonts.googleapis.com/css2?family=${font}:wght@${wght}`)
						.then(r => {
							avail.push(wght);
							if(avail.length && avail.length == wghts.length){
								commencer();
							}
						})
						.catch(e => {
							avail.push("no")
							if(avail.length && avail.length == wghts.length){
								commencer();
							}
						});
					}

					// retrieved all weights, whether they exist or not
					function commencer(){
						// clean out the array
						avail = avail.filter(wght => !isNaN(wght)).sort((a, b) => (a - b));

						// only 1 weight
						if(avail.length == 1){
							let req = `https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,${avail[0]};1,${avail[0]}`;
							fetch(req)
							.then(r => {
								//console.log(`OK: ${req}`);
								finalFontsArray.push(`${font}:ital,wght@0,${avail[0]};1,${avail[0]}`);
								fontsCombined();
							})
							.catch(e => {
								//console.log(`FAIL: ${req}`)
							})
						}

						// multiple weights, try for variable stylesheet
						else {					
							let sm = avail.reduce((a,b) => Math.min(a,b));
							let lg = avail.reduce((a,b) => Math.max(a,b));

							let req = `https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,${sm}..${lg};1,${sm}..${lg}`
							fetch(req)
							.then(r => {
								//console.log(`OK: ${req}`);
								finalFontsArray.push(`${font}:ital,wght@0,${sm}..${lg};1,${sm}..${lg}`);
								fontsCombined();
							})
							
							// not a variable font, load weights individually
							.catch(e => {
								//console.log(`FAIL: ${req}`);
								let zero = [...avail];
								let one = [...avail];

								for(let i=0; i<zero.length; i++){
									zero[i] = `0,${zero[i]}`
								}

								zero = zero.join(";")

								for(let i=0; i<one.length; i++){
									one[i] = `1,${one[i]}`
								}

								one = one.join(";")

								let combo = [zero, one].join(";");

								let newReq = `https://fonts.googleapis.com/css2?family=${font}:ital,wght@${combo}`;
								fetch(newReq)
								.then(r => {
									//console.log(`OK: ${newReq}`);
									finalFontsArray.push(`${font}:ital,wght@${combo}`);
									fontsCombined();
								})
								.catch();
							})
						}
					}
				}).catch(e => {
					console.log(`${font} does not exist on Google Fonts.`)
				})			

				// add the google fonts stylesheet when everything is done
				function fontsCombined(){
					if(finalFontsArray.length == okFontsArray.length){
						let finalFontsStr = `https://fonts.googleapis.com/css2?family=${finalFontsArray.join("&family=")}&display=swap`;
						let sheet = document.createElement("link");
						sheet.href = finalFontsStr;
						sheet.rel = "stylesheet";
						document.head.append(sheet)
					}
				}
			}//end: loop through each font
		}//end: if arg isn't empty
	} else {
		// no user input, end operation
	}
}
