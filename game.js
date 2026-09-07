console.log('[Cramerr] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const hitSound = new Audio();
hitSound.src = './effects/hit.wav';

const canvasEl = document.querySelector('#game-canvas');
const context = canvasEl.getContext('2d');

function collided(bird, ground) {
    const birdY = bird.y + bird.height;
    const groundY = ground.y;

    if (birdY >= groundY) {
        return true;
    }

    return false;
}

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

function createBird() {
    const bird = {
        sourceX: 0,
        sourceY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        gravity: 0.25,
        jumpForce: 4.6,
        speed: 0,
        jump: function () {
            this.speed = -(this.jumpForce);
        },
        update: function () {
            if (collided(this, ground)) {
                hitSound.play();

                setTimeout(() => {
                    changeScene(Scenes.START);
                }, 300);

                return;
            }

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

    return bird;
}

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

const globals = {};

let currentScene = {};
function changeScene(newScene) {
    currentScene = newScene;

    if (newScene.initialize) {
        newScene.initialize();
    }
}

const Scenes = {};

Scenes.START = {
    initialize: function () {
        globals.bird = createBird();
    },
    draw: function () {
        background.draw();
        ground.draw();
        getReadyMessage.draw();
        globals.bird.draw();
    },
    click: function () {
        changeScene(Scenes.GAME);
    },
    update: function () { }
};

Scenes.GAME = {
    draw: function () {
        background.draw();
        ground.draw();
        globals.bird.draw();
    },
    click: function () {
        globals.bird.jump();
    },
    update: function () {
        globals.bird.update();
    }
};

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
