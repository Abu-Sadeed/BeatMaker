class drumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad')
        this.playBtn = document.querySelector('.play')
        this.currentKick = './allSounds/kick-808.wav'
        this.currentSnare = './allSounds/snare-808.wav'
        this.currentHihat = './allSounds/hihat-808.wav'
        this.kickAudio = document.querySelector('.kick-sound')
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound')
        this.index = 0
        this.bpm = 150
        this.isPlaying = null
        this.selects = document.querySelectorAll('select')
    }

    activePad() {
        this.classList.toggle('active')
    }

    repeat() {
        let steps = this.index % 8
        const activeBars = document.querySelectorAll(`.b${steps}`)
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0
                    this.kickAudio.play()
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0
                    this.snareAudio.play()
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0
                    this.hihatAudio.play()
                }
            }
        })
        this.index++
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = 'Stop'
            this.playBtn.classList.add('active')
        } else {
            this.playBtn.innerText = 'Play'
            this.playBtn.classList.remove('active')
        }


    }
    changeSound(e) {
        const selectionName = e.target.name
        const selectionValue = e.target.value
        console.log(selectionValue)
        switch (selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue
            case 'snare-select':
                this.snareAudio.src = selectionValue
            case 'hihat-select':
                this.hihatAudio.src = selectionValue
        }
    }

    start() {
        const interval = (60 / this.bpm) * 1000
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat()
            }, interval)
        } else {
            clearInterval(this.isPlaying)
            this.isPlaying = null
        }


    }
}


const kit = new drumKit()

kit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        kit.changeSound(e)
    })
})

kit.pads.forEach(pad => {
    pad.addEventListener('click', kit.activePad)
    pad.addEventListener('animationend', function () {
        this.style.animation = ''
    })
})

kit.playBtn.addEventListener('click', () => {
    kit.updateBtn()
    kit.start()
})