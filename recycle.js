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
	createCanvas(800, 600);
	timeTilSpawn = 120;
	currentPhrase = "TIME TO START";

	bins[0] = new bin(100, 450, types[0]);
	bins[1] = new bin(250, 450, types[1]);
	bins[2] = new bin(400, 450, types[2]);
	bins[3] = new bin(550, 450, types[3]);

	goodPhrases[0] = "Correct Phrase 1 Filler";
	goodPhrases[1] = "Correct Phrase 2 Filler";

	badPhrases[0] = "Incorrect Phrase 1 Filler";
	badPhrases[1] = "Incorrect Phrase 2 Filler";

	ouchPhrases[0] = "OW!";
	ouchPhrases[1] = "STOP THAT!";

	deblasioScore = deblasio[0];
	deblasioGame = deblasio[0];

	items.push(new item("Paper", 0));
	rectMode(CENTER);
	imageMode(CENTER);
	textAlign(CENTER);
	cutTime = 60;
	track1.setLoop(false);
	track2.setLoop(true);
	currentCursor = mouse;
	textSize(30);
	noStroke();
}

function draw(){

	switch(state){
		case 0:
			fill(255);
			if(tutorialNum == 0){
				background(205);

				deblasioSin = 30 * sin(millis()/1000);
				image(deblasioScore, 105, 220 + deblasioSin, deblasioScore.width/5.5, deblasioScore.height/5.5);
				image(dBin, 100, 300, dBin.width/5, dBin.height/5);
				image(dLid, 100, 150 + deblasioSin, dLid.width/5, dLid.height/5);
				fill(255);
				rect(400, 290, 200, 40);
				fill(0);
				text("Click to start!", 400, 300);
			} else if (tutorialNum == 1){
				background(125);
			} else if (tutorialNum == 2){
				background(255, 0, 0);
			} else if (tutorialNum == 3){
				background(0, 255, 0);
			}

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    			text("MOBILE VERSION", 400, 350);
			}

			break;
		case 1:
			noCursor();

			if(!loopTrack){
				track1.play();
				loopTrack = true;
			}
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
								break;
							}
						} else {
							items[i].correct = false;
							//
						}
					}
				} else {
					items[i].move();
				}

				if(items[i].x >= 850){
					items.splice(i, 1);
					missedItems++;
					console.log("OOPS:"+ missedItems);
					timeTilSpawn-=.5;
				}

				items[i].display();
			}
			fill(255);
			rect(400, 80, 300, 50);
			fill(0);
			text(currentPhrase, 400, 80);

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
				timer = random(-10, 40);
				num++;
			}

			if(missedItems >= 30){
				state = 2;
			}

			score = (rightItems - missedItems) * 10;
			cutTime--;
			text(score, 50, 40);
			image(currentCursor, mouseX, mouseY, mouse.width/6, mouse.height/6);
			break;
		case 2:

			timer++;

			if(timer >= 80 && result <=2){
				result++;
				timer = 0;
			}

			background(255);
			rectMode(CORNER);
			text("Your Score: " + int(scoreX), 400, 250);
			image(deblasioScore, 105, 220 + binLidY, deblasioScore.width/5.5, deblasioScore.height/5.5);
			image(dBin, 100, 300, dBin.width/5, dBin.height/5);
			image(dLid, 100, 150 + binLidY, dLid.width/5, dLid.height/5);
			if(scoreX >= 300){
				fill(0, 0, 255);
			} else if(scoreX >= 100){
				fill(0, 255, 0);
			} else {
				fill(255, 0, 0);
			}
			rect(200, 280, scoreX, 10);

			if(result == 1){
				scoreX = lerp(scoreX, score, 0.025);
				binLidY = lerp(binLidY, 50, 0.05);
				deblasioScore = deblasio[0];

			}else if(result == 2){
				scoreX = score;
				if(score <= -100){
					deblasioScore = deblasio[2];
					textScore = "YIKES";
				} else {
					if(score <= 0){
						textScore = "OOOF";
						deblasioScore = deblasio[1];
					} else if (score <= 50){
						textScore = "HMMM";
						deblasioScore = deblasio[0];
					} else if (score <= 100){
						textScore = "GOOD..";
						deblasioScore = deblasio[3];
					} else if (score > 100){
						textScore = "WOW!!!";
						deblasioScore = deblasio[4];
					}
				}
				cityScoreX = lerp(cityScoreX, cityScore, 0.025);
				binLidY = lerp(binLidY, -60, 0.05);
			}else if(result >= 3){
				scoreX = score;
				cityScoreX = cityScore;
				binLidY = -60;
				text(textScore, 400, 100);
			}
			fill(255, 0, 0);
			text("Deblasio's Score: " + int(cityScoreX), 400, 320);
			rect(200, 340, cityScoreX, 10);
	}

}

function mousePressed(){
	if(state == 0){
		if(tutorialNum == 0 && mouseX >= 300 && mouseX <= 500 && mouseY <= 310 && mouseY >= 280){
			tutorialNum++;
		} else if (tutorialNum > 0 && tutorialNum < 3){
			tutorialNum ++;
		} else if(tutorialNum == 3){
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
			currentPhrase = ouchPhrases[int(random(2))];
		}
		
	}

	if(state == 2){
		if(result >= 3){
			reset();
			setup();
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
							currentPhrase = goodPhrases[int(random(2))];
							bins[b].right = true;
							speed += .045;
							timeTilSpawn -=.65;
							rightCue.play();
							deblasioSad = true;
							
						} else {
							timeTilSpawn+=.5;
							missedItems++;
							currentPhrase = badPhrases[int(random(2))];
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
	preventDefault();
	//blockMenuHeaderScroll = true;
}

function reset(){
	state = 0;
	tutorialNum = 0;
	pile = [];
	items = [];
}

class item{
	constructor(type, num){
		this.x = -100;
		this.y = 300;
		this.category = type;
		if(type == "Organic"){
			this.img = organicImages[int(random(6))];
		} else if(type =="Paper"){
			this.img = paperImages[int(random(3))];
		} else if(type == "Plastic"){
			this.img = plasticImages[int(random(5))];
		} else if (type == "Trash"){
			this.img = trashImages[int(random(6))];
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