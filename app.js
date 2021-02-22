class drumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad')
        this.kickAudio = document.querySelector('kick-sound')
        this.snareAudio = document.querySelector('snare-sound')
        this.hihatAudio = document.querySelector('hihat-sound')
        this.index = 0

    }

    repeat(){
        let steps = this.index % 8
        this.index++
    }
    start(){ 
        setInterval(() => {
            this.repeat()
        }, 1000)
    }
}


const kit = new drumKit()

kit.start()