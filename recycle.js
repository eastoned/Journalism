var items = [];
var types = [];
var bins = [];
var pile = [];
var goodPhrases = [];
var badPhrases = [];
var ouchPhrases = [];
var track1, track2;
var rightCue, wrongCue, pileCue;
var state;
var currentPhrase;
var timer = 0;
var cutTime = 0;
var gameTimer = 0;
var num = 1;
var rightItems = 0;
var missedItems = 0;
var holding = false;
var loopTrack = false;
var addTrash = false;
var deblasioSad = false; 
var deblasioHappy = false;
var deblasioReallyHappy = false;
var timeTilSpawn;
var speed;
var organicImages = [];
var paperImages = [];
var plasticImages = [];
var trashImages = [];
var binImages = [];
var highlightBinRed, outlineBinRed;
var highlightBinGreen, outlineBinGreen;
var pileImages = [];
var deblasio = [];
var dBin, dLid;
var wall, pavement, skyline, sky;
var tutorialImages = [];
var tutorialNum = 0;
var score = 0;
var textScore;
var cityScore = 200;
var scoreX = 0;
var cityScoreX = 0;
var result = 0;
var lastUnit = 0;
var binLidY = -30;
var deblasioScore;
var deblasioGame;
var deblasioSin = 0;
var mouse, mouseheld;
var currentCursor;
var fontBody, fontTitle;
var endPos;
var begPos;
//needs mute button

function preload(){
	types[0] = "Organic";
	types[1] = "Paper";
	types[2] = "Plastic";
	types[3] = "Trash";

	wall = loadImage("assets/wall.png");
	pavement = loadImage("assets/pavement.png");
	skyline = loadImage("assets/skyline.png");
	sky =loadImage("assets/sky.png");
	dBin = loadImage("assets/deblasiobin/trashcan.png");
	dLid = loadImage("assets/deblasiobin/lid.png");
	mouse = loadImage("assets/cursor.png");
	mouseheld = loadImage("assets/cursorheld.png");

	fontBody = loadFont("assets/roboto.ttf");
	fontTitle = loadFont("assets/eczar.ttf");

	pileImages[0] = loadImage("assets/pile/1.png");
	pileImages[1] = loadImage("assets/pile/2.png");
	pileImages[2] = loadImage("assets/pile/3.png");
	pileImages[3] = loadImage("assets/pile/4.png");

	binImages[0] = loadImage("assets/ORGANIC.png");
	binImages[1] = loadImage("assets/PAPER.png");
	binImages[2] = loadImage("assets/METALPLASTIC.png");
	binImages[3] = loadImage("assets/LANDFILL.png");

	highlightBinRed = loadImage("assets/redhighlight.png");
	highlightBinGreen = loadImage("assets/greenhighlight.png");
	outlineBinRed = loadImage("assets/redoutline.png");
	outlineBinGreen = loadImage("assets/greenoutline.png");

	organicImages[0] = loadImage("assets/organic/apple.png");
	organicImages[1] = loadImage("assets/organic/dryleaves.png");
	organicImages[2] = loadImage("assets/organic/paper.png");
	organicImages[3] = loadImage("assets/organic/pizza.png");
	organicImages[4] = loadImage("assets/organic/plate.png");
	organicImages[5] = loadImage("assets/organic/teabag.png");

	paperImages[0] = loadImage("assets/paper/cerealbox.png");
	paperImages[1] = loadImage("assets/paper/eggcarton.png");
	paperImages[2] = loadImage("assets/paper/pizzabox.png");

	plasticImages[0] = loadImage("assets/plastic/beerbottle.png");
	plasticImages[1] = loadImage("assets/plastic/milk.png");
	plasticImages[2] = loadImage("assets/plastic/spraycan.png");
	plasticImages[3] = loadImage("assets/plastic/takeawaybox.png");
	plasticImages[4] = loadImage("assets/plastic/toaster.png");

	trashImages[0] = loadImage("assets/trash/battery.png");
	trashImages[1] = loadImage("assets/trash/diaper.png");
	trashImages[2] = loadImage("assets/trash/plasticbag.png");
	trashImages[3] = loadImage("assets/trash/poop.png");
	trashImages[4] = loadImage("assets/trash/starbucks.png");
	trashImages[5] = loadImage("assets/trash/styro.png");

	deblasio[0] = loadImage("assets/deblasio/deblasio.png");
	deblasio[1] = loadImage("assets/deblasio/deblasioloss.png");
	deblasio[2] = loadImage("assets/deblasio/deblasiototalloss.png");
	deblasio[3] = loadImage("assets/deblasio/deblasiowin.png");
	deblasio[4] = loadImage("assets/deblasio/deblasiototalwin.png");
	deblasioScore = deblasio[0];
	deblasioGame = deblasio[0];

	track1 = loadSound("assets/music/introLoop.mp3");
	track1.setVolume(.25);
	track2 = loadSound("assets/music/fastLoop.mp3");
	track2.setVolume(.25);

	pileCue = loadSound("assets/audio/toss.wav");
	pileCue.setVolume(1);
	rightCue = loadSound("assets/audio/can.wav");
	rightCue.setVolume(.4);
	wrongCue = loadSound("assets/audio/crash.wav");
	wrongCue.setVolume(.15);
}

function setup(){
	items = [];
	bins = [];
	pile = [];
	result = 0;
	speed = 1;
	state = 0;
	score = 0;
	scoreX = 0;
	rightItems = 0;
	missedItems = 0;
	frameRate(60);
	var canvas = createCanvas(800, 600);
	canvas.parent('game-holder');
	timeTilSpawn = 240;
	currentPhrase = "Let's see whatcha got!";

	bins[0] = new bin(100, 450, types[0]);
	bins[1] = new bin(250, 450, types[1]);
	bins[2] = new bin(400, 450, types[2]);
	bins[3] = new bin(550, 450, types[3]);

	goodPhrases[0] = "HMPH!";
	goodPhrases[1] = "Lucky guess...";
	goodPhrases[2] = "Show off.";
	goodPhrases[3] = "You don't have to rub it in.";
	goodPhrases[4] = "What are you trying to prove...";
	goodPhrases[5] = "The next one won't be as easy.";

	ouchPhrases[0] = "OW!";
	ouchPhrases[1] = "STOP THAT!!";
	ouchPhrases[2] = "Shouldn't you be doing something?!?";
	ouchPhrases[3] = "That trash won't recycle itself!!";
	ouchPhrases[4] = "I'm sensitive there...";
	ouchPhrases[5] = "ENOUGH! STOP!";
	ouchPhrases[6] = "Leave me alone! Clean that trash!";

	deblasioScore = deblasio[0];
	deblasioGame = deblasio[0];

	items.push(new item(types[int(random(4))], 0));
	rectMode(CENTER);
	imageMode(CENTER);
	textAlign(CENTER);
	cutTime = 60;
	track1.setLoop(false);
	track2.setLoop(true);
	currentCursor = mouse;
	textSize(30);
	noStroke();
	endPos = 0;
	begPos = 0;
}

function draw(){

	switch(state){
		case 0:
			if(tutorialNum == 0){
				if(!track1.isPlaying()){
				track1.play();
				}

				gameTimer++;
			
				image(sky, 400, 300, sky.width/3, sky.height/3);
				image(skyline, 400, 150, skyline.width/3, skyline.height/3);
				image(deblasioGame, 200 + begPos, 350 + (200 * sin(gameTimer/25)), deblasioGame.width/3, deblasioGame.height/3);
				image(dLid, 195 + begPos, 255 + (290 * sin(gameTimer/25)), dLid.width/3, dLid.height/3);
				image(dBin, 195 + begPos, 360 + (20 * sin(gameTimer/25)), dBin.width/2.8, dBin.height/2.8);
				image(pavement, 400, 550, pavement.width/3, pavement.height/3);
				image(wall, 400, 365, wall.width/3, wall.height/3);
				if(sin(gameTimer/25) >= 0){
					begPos = random(-150, 650);
				}
				if(mouseX >= 300 && mouseX <= 500 && mouseY <= 360 && mouseY >= 320){
					fill(34, 198, 44, 220);
				} else {
					fill(255, 170);
				}
				rect(400, 340, 200, 40, 15);
				noStroke();
				fill(0);
				textSize(30);
				textFont(fontBody);
				text("Play!", 400, 350);
				textSize(100);
				fill(255);
				textFont(fontTitle);
				text("Let’s clean NYC!", 400, 110 + (10 * sin(gameTimer/40)));
				textSize(25);
				//text("Show Mayor De Blasio how it’s done.", 580, 130 + (10 * sin(gameTimer/40)));
				text("Show Mayor De Blasio how it’s done.", 400, 280 + (7 * sin(gameTimer/-30)));
			} else if (tutorialNum == 1){
				background(125);
				textSize(35);
				text("Put the trash into the right bin.", 400, 550, 700, 100);
			} else if (tutorialNum == 2){
				background(255, 0, 0);
				textSize(35);
				text("Keep up and don’t put the waste into the wrong bin or the trash will pile up.", 400, 500, 700, 100);
			} else if (tutorialNum == 3){
				background(0, 255, 0);
				textSize(35);
				text("Set the High Score and show that you can recycle better than De Blasio’s crew.", 400, 500, 700, 100);
			}

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

			}

			break;
		case 1:
			noCursor();
			textSize(30);
			textFont(fontBody);
			if(!loopTrack){
				track1.play();
				deblasioGame = deblasio[0];
				loopTrack = true;
			}
			track2.setLoop(true);
			if(loopTrack && track1.currentTime() >= track1.duration() - 1){
				console.log("track switch");
				track1.stop();
				track2.play();
			}

			timer++;
			gameTimer++;
			
			image(sky, 400, 300, sky.width/3, sky.height/3);
			image(skyline, 400, 150, skyline.width/3, skyline.height/3);
			image(pavement, 400, 550, pavement.width/3, pavement.height/3);
			image(deblasioGame, 200, 175 + (5 * sin(gameTimer/30)), deblasioGame.width/3, deblasioGame.height/3);
			image(dLid, 195, 60 + (9 * sin(gameTimer/30)), dLid.width/3, dLid.height/3);
			image(dBin, 195, 345, dBin.width/2.8, dBin.height/2.8);
			image(wall, 400, 365, wall.width/3, wall.height/3);
			fill(255);

			for(var i = 0; i < bins.length; i++){
				bins[i].display();
				if(cutTime <= 0){
					deblasioSad = false;
					deblasioHappy = false;
					deblasioReallyHappy = false;
					bins[i].right = false;
					bins[i].wrong = false;
				}
				
			}

			for(var i = 0; i < pile.length; i++){
				pile[i].display();
			}

			for(var i = items.length - 1; i >= 0; i--){
				items[i].display();
				if(items[i].held){
					items[i].lift();

					for(var b = 0; b < bins.length; b++){
						if(dist(items[i].x, items[i].y, bins[b].x, bins[b].y) < 100){
							if(items[i].category == bins[b].category){
								items[i].correct = true;
								image(outlineBinGreen, bins[b].x, bins[b].y, outlineBinGreen.width/5, outlineBinGreen.height/5);
								items[i].display();
								break;
							} else {
								image(outlineBinRed, bins[b].x, bins[b].y, outlineBinGreen.width/5, outlineBinGreen.height/5);
								items[i].display();
								break;
							}
						} else {
							items[i].correct = false;
						}
					}
				} else {
					items[i].move();
				}

				if(items[i].x >= 850){
					if(!wrongCue.isPlaying()){
						wrongCue.play();
						currentPhrase = items[i].phrase;
					}
					items.splice(i, 1);
					missedItems++;
					console.log("OOPS:"+ missedItems);
					timeTilSpawn-=.5;
				}
				
			}
			fill(255, 200);
			rect(550, 110, 450, 120, 30);
			fill(0);
			textFont(fontTitle);
			text(currentPhrase, 550, 110, 449, 115);

			if(deblasioReallyHappy){
				deblasioGame = deblasio[2];
			} else if(deblasioHappy){
				if(random(1) > .65){
					deblasioGame = deblasio[int(random(2))];
				}
			} else if (deblasioSad){
				deblasioGame = deblasio[3];
			} else {
				deblasioGame = deblasio[0];
			}

			if(missedItems >= 5 && missedItems%5 == 0 && lastUnit != missedItems){
				pile.push(new pilePiece(600 - (missedItems * 20), pileImages[int(random(4))]));
				deblasioReallyHappy = true;
				cutTime = 45;
				if(!pileCue.isPlaying()){
					pileCue.play();
				}
				lastUnit = missedItems;
			}

			if(timer >= timeTilSpawn){
				items.push(new item(types[int(random(4))], num));
				timer = random(-10, 20);
				num++;
			}

			if(missedItems >= 30){
				state = 2;
			}

			score = (rightItems - missedItems) * 10;
			cutTime--;
			image(currentCursor, mouseX, mouseY, mouse.width/6, mouse.height/6);
			if(keyIsDown(32)){
				state = 2;
			}
			break;
		case 2:
			cursor(ARROW);
			textAlign(CENTER);
			textSize(20);
			if(score <= 0){
				score = 0;
			}
			textFont(fontBody);

			timer++;
			gameTimer++;

			if(timer >= 100 && result <=2){
				result++;
				timer = 0;
			}

			background(255);
			image(sky, 400, 300, sky.width/3, sky.height/3);
			image(skyline, 400, 150 + endPos, skyline.width/3, skyline.height/3);
			image(pavement, 400, 550 + endPos, pavement.width/3, pavement.height/3);
			image(deblasioScore, 200, 175 + (5 * sin(gameTimer/30)) + endPos + binLidY, deblasioScore.width/3, deblasioScore.height/3);
			image(dLid, 195, 60 + (9 * sin(gameTimer/30)) + endPos + binLidY, dLid.width/3, dLid.height/3);
			image(dBin, 195, 345 + endPos, dBin.width/2.8, dBin.height/2.8);
			image(wall, 400, 365 + endPos, wall.width/3, wall.height/3);

			for(var i = 0; i < pile.length; i++){
				pile[i].display();
				pile[i].y = (600 - (i * 20)) + endPos;
			}

			for(var i = 0; i < bins.length; i++){
				bins[i].display();
				bins[i].y = 450 + endPos;
			}

			rectMode(CORNER);
			
			endPos = lerp(endPos, 300, 0.05);

			if(result == 1){
				
				scoreX = lerp(scoreX, score, 0.025);
				binLidY = lerp(binLidY, 120, 0.05);
				deblasioScore = deblasio[0];

			}else if(result == 2){
				scoreX = score;
				textSize(50);
				if(score <= 0){
					deblasioScore = deblasio[2];
					textScore = "Boo!\nYou are a TRASH TURD.";
				} else if(score <= 50){
					textScore = "Better luck next time!\nYou are a LITTER LOSER.";
					deblasioScore = deblasio[1];
				} else if (score <= 100){
					textScore = "So close!\nYou are a CAN COLLECTOR.";
					deblasioScore = deblasio[0];
				} else if (score <= 150){
					textScore = "Congratulations!\nYou are RECYCLING ROYALTY!";
					deblasioScore = deblasio[3];
				} else if (score > 200){
					textScore = "We kneel before you!\nYou are a GARBAGE GOD!";
					deblasioScore = deblasio[4];
				}
				textSize(20);
				cityScoreX = lerp(cityScoreX, cityScore, 0.025);
				
				binLidY = lerp(binLidY, -60, 0.05);
			}else if(result >= 3){
				scoreX = score;
				cityScoreX = cityScore;
				binLidY = -60;
				textSize(30);
				textFont(fontTitle);
				text(textScore, 300, 250 + (5 * sin(gameTimer/-25)), 500, 200);
				textFont(fontBody);
				if(mouseX >= 480 && mouseX <= 620 && mouseY >= 370 && mouseY <= 420){
					fill(34, 198, 44, 220);
				} else {
					fill(255, 170);
					
				}
				rect(480, 370, 140, 50, 15);
				noStroke();
				fill(0);
				textSize(20);
				text("Try Again?", 550, 400);
			}

			fill(255);
			textSize(16);
			textAlign(LEFT);
			text("*million tons of garbage\ndisposed properly.", 200, 230);
			textAlign(CENTER);
			textSize(25);
			text("Your Score: " + int(scoreX) + "*", 400, 100);
			if(scoreX >= 200){
					fill(41, 253, 55);
			} else if(scoreX >= 150){
					fill(200, 253, 52);
			} else if(scoreX >= 100){
					fill(253, 126, 36);
			} else if(scoreX >= 50){
					fill(252, 67, 34);
			} else {
					fill(252, 13, 28);
			}
			rect(200, 115, scoreX, 20);


			fill(255);
			text("Mayor De Blasio's Score: " + int(cityScoreX) + "*", 400, 175);
			if(cityScoreX >= 200){
					fill(41, 253, 55);
			} else if(cityScoreX >= 150){
					fill(200, 253, 52);
			} else if(cityScoreX >= 100){
					fill(253, 126, 36);
			} else if(cityScoreX >= 50){
					fill(252, 67, 34);
			} else {
					fill(252, 13, 28);
			}
			rect(200, 190, cityScoreX, 20);
			fill(0, endPos/2.5);
			rect(0, 528, 800, 72);
			textAlign(LEFT);
			textSize(19);
			fill(255, endPos);
			text("Credits:\nGame Design: Easton Self\t\t\t\tIllustrations: Asaki Okamura\t\t\t\tSoundtrack: Sheila Bugal", 25, 560);
	}

}

function mousePressed(){
	if(state == 0){
		if(tutorialNum == 0 && mouseX >= 300 && mouseX <= 500 && mouseY <= 360 && mouseY >= 320){
			tutorialNum++;
		} else if (tutorialNum > 0 && tutorialNum < 3){
			tutorialNum++;
		} else if(tutorialNum == 3){
			if(track1.isPlaying()){
				track1.stop();
			}
			state++;
		}
	}

	if(state == 1){
		currentCursor = mouseheld;
		for(var i = 0; i < items.length; i++){
			if(dist(mouseX, mouseY, items[i].x, items[i].y) < 40 && !holding){
				holding = true;
				items[i].held = true;
			}
		}

		if(mouseX >= 140 && mouseX <= 240 && mouseY >= 50 && mouseY <= 200){
			currentPhrase = ouchPhrases[int(random(7))];
		}
		
	}

	if(state == 2){
		if(result >= 3 && mouseX >= 480 && mouseX <= 620 && mouseY >= 370 && mouseY <= 420){
			reset();
			state = 1;
		}
	}

}

function mouseReleased(){
	if(state == 1){
		currentCursor = mouse;
		for(var i = items.length - 1; i >= 0; i--){
			if(items[i].held){
				for(var b = 0; b < bins.length; b++){
					if(dist(items[i].x, items[i].y, bins[b].x, bins[b].y) < 100){
						if(items[i].category == bins[b].category){
							items[i].returned = true;
							rightItems++;
							currentPhrase = goodPhrases[int(random(6))];
							bins[b].right = true;
							speed += .075;
							timeTilSpawn -= .65;
							rightCue.play();
							deblasioSad = true;
						} else {
							timeTilSpawn += .5;
							missedItems++;
							currentPhrase = items[i].phrase;
							bins[b].wrong = true;
							wrongCue.play();
							deblasioHappy = true;
							
						}
						cutTime = 30;
						items.splice(i, 1);
					}
				}
			}
			holding = false;
			items[i].held = false;
		}
	}
}

function touchMoved(){

}

function reset(){
	for(var i = 0; i < bins.length; i++){
		bins[i].y = 450;
	}
	tutorialNum = 0;
	timer = 0;
	gameTimer = 0;
	score = 0;
	scoreX = 0;
	rightItems = 0;
	missedItems = 0;
	speed = 1;
	pile = [];
	items = [];
	cityScore = 200;
	cityScoreX = 0;
	result = 0;
	deblasioScore = deblasio[0];
	deblasioGame = deblasio[0];
	timeTilSpawn = 240;
	currentPhrase = "Let's see whatcha got!";
	rectMode(CENTER);
	imageMode(CENTER);
	textAlign(CENTER);
	endPos = 0;
}

class item{
	constructor(type, num){
		this.x = -100;
		this.y = 300;
		this.category = type;
		if(type == "Organic"){
			this.img = organicImages[int(random(6))];
			switch(this.img){
				case organicImages[0]:
					this.phrase = "Big Apple into the little BROWN bin, you nut!";
					break;
				case organicImages[1]:
					this.phrase = "Leaves anywhere else than the BROWN bin? I don’t think so.";
					break;
				case organicImages[2]:
					this.phrase = "There’s coffee on this napkin! Put it in the BROWN bin.";
					break;
				case organicImages[3]:
					this.phrase = "Not from NYC, eh? Pizza belongs in the BROWN bin!";
					break;
				case organicImages[4]:
					this.phrase = "This paper plate is soiled! Off to the ORGANIC bin with it!";
					break;
				case organicImages[5]:
					this.phrase = "Who drinks tea?! Well, put it in the ORGANIC bin.";
					break;
			}
		} else if(type =="Paper"){
			this.img = paperImages[int(random(3))];
			switch(this.img){
				case paperImages[0]:
					this.phrase = "Stay in school and eat your cornflakes. This goes in the PAPER bin!";
					break;
				case paperImages[1]:
					this.phrase = "The egg carton belongs in the PAPER bin, bozo!";
					break;
				case paperImages[2]:
					this.phrase = "It’s a PAPER box! FFS!";
					break;
			}
		} else if(type == "Plastic"){
			this.img = plasticImages[int(random(5))];
			switch(this.img){
				case plasticImages[0]:
					this.phrase = "Clink it right into the BLUE bin.";
					break;
				case plasticImages[1]:
					this.phrase = "What do you think milk cartons are made of? Not milk...PLASTIC!";
					break;
				case plasticImages[2]:
					this.phrase = "Are you huffing paint? This belongs in the METAL bin.";
					break;
				case plasticImages[3]:
					this.phrase = "You have had your lunch, fatty, now at least put the container in the PLASTIC bin!";
					break;
				case plasticImages[4]:
					this.phrase = "...might is well put it in your bathtub. It goes in the METAL bin.";
					break;
			}
		} else if (type == "Trash"){
			this.img = trashImages[int(random(6))];
			switch(this.img){
				case trashImages[0]:
					this.phrase = "Are you crazy? Batteries belong in the LANDFILL!";
					break;
				case trashImages[1]:
					this.phrase = "Your diapers belong in the LANDFILL, babyface!";
					break;
				case trashImages[2]:
					this.phrase = "Don’t be ridiculous. Plastic bags go into the LANDFILL!";
					break;
				case trashImages[3]:
					this.phrase = "Poopy di scoop. Scoopy di LANDFILL.";
					break;
				case trashImages[4]:
					this.phrase = "Hey! Wake up! Coffee cups go in the LANDFILL.";
					break;
				case trashImages[5]:
					this.phrase = "With your styrofoam brain, you belong in the LANDFILL, too.";
					break;
			}
		}
		
		this.held = false;
		this.returned = false;
		this.correct = false;
		this.id = num;
	}

	display(){
		if(this.correct){
			noStroke();
			fill(125);
		} else {
			noStroke();
			fill(255);
		}

		image(this.img, this.x, this.y, this.img.width/6, this.img.height/6);
		fill(255, 0, 255);
	}
	move(){
		this.y = 300;
		this.x += speed;
	}
	lift(){
		this.x = mouseX;
		this.y = mouseY;
	}
}

class bin{
	constructor(xPos, yPos, type){
		this.x = xPos;
		this.y = yPos;
		this.category = type;
		if(type == "Organic"){
			this.img = binImages[0];
		} else if(type =="Paper"){
			this.img = binImages[1];
		} else if(type == "Plastic"){
			this.img = binImages[2];
		} else if (type == "Trash"){
			this.img = binImages[3];
		}
		this.wrong = false;
		this.right = false;
	}
	display(){
		//fill(255, 0, 255);
		image(this.img, this.x, this.y, this.img.width/5, this.img.height/5);
		if(this.right){
			image(highlightBinGreen, this.x, this.y, highlightBinGreen.width/5, highlightBinGreen.height/5);
			image(outlineBinGreen, this.x, this.y, outlineBinGreen.width/5, outlineBinGreen.height/5);
		} else if (this.wrong){
			image(highlightBinRed, this.x, this.y, highlightBinRed.width/5, highlightBinRed.height/5);
			image(outlineBinRed, this.x, this.y, outlineBinRed.width/5, outlineBinRed.height/5);
		}
	}
}

class pilePiece{
	constructor(yPos, piece){
		this.x = random(710, 740);
		this.y = yPos;
		this.img = piece;
	}
	display(){
		image(this.img, this.x, this.y, this.img.width/5, this.img.height/5);
	}
}