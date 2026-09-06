console.log('[Cramerr] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvasEl = document.querySelector('#game-canvas');
const context = canvasEl.getContext('2d');

const background = {
    sourceX: 390,
    sourceY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvasEl.height - 204,
    draw: function () {
        context.fillStyle = '#70c5ce';
        context.fillRect(0, 0, canvasEl.width, canvasEl.height);

        context.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
        context.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            (this.x + this.width), this.y,
            this.width, this.height
        );
    }
};

const ground = {
    sourceX: 0,
    sourceY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvasEl.height - 112,
    draw: function () {
        context.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
        context.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            (this.x + this.width), this.y,
            this.width, this.height
        );
    }
};

const bird = {
    sourceX: 0,
    sourceY: 0,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    gravity: 0.25,
    speed: 0,
    update: function () {
        this.speed += this.gravity;
        this.y += this.speed;
    },
    draw: function () {
        context.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
    }
};

const getReadyMessage = {
    sourceX: 134,
    sourceY: 0,
    width: 174,
    height: 152,
    x: (canvasEl.width / 2) - (174 / 2),
    y: 50,
    draw: function () {
        context.drawImage(
            sprites,
            this.sourceX, this.sourceY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height
        );
    }
};

// Scenes

let currentScene = {};
function changeScene(newScene) {
    currentScene = newScene;
}

const Scenes = {};

Scenes.START = {
    draw: function () {
        background.draw();
        ground.draw();
        getReadyMessage.draw();
        bird.draw();
    },
    click: function() {
        changeScene(Scenes.GAME);
    },
    update: function() {}
}

Scenes.GAME = {
    draw: function () {
        background.draw();
        ground.draw();
        bird.draw();
    },
    update: function() {
        bird.update();
    }
}

function loop() {
    currentScene.draw();
    currentScene.update();

    requestAnimationFrame(loop);
}

canvasEl.addEventListener('click', () => {
    if (currentScene.click) {
        currentScene.click();
    }
});

changeScene(Scenes.START);

loop();
