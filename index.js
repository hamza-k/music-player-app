var musicPlayer = new Vue({
    el: "#app",
    data: {
        trackList : [
            {
                id: 12345,
                name : "Kaash Paige - Love Songs ft 6LACK Remix",
                author : "Kaash Paige",
                featuring : ["6LACK"],
                title : "Love songs - Remix",
                isLiked : false,
                trackPath: "songs/tracks/track1.mp3",
                trackCover: "songs/covers/cover1.jpg"
            },
            {
                id: 34567,
                name : "Masego - Queen Tings Ft Tiffany Gouché",
                author : "Masego",
                featuring : ["Tiffany Gouché"],
                title : "Queen tings",
                isLiked : false,
                trackPath: "songs/tracks/track2.mp3",
                trackCover: "songs/covers/cover2.jpg"
            },
            {
                id: 36431,
                name : "The Weeknd - Material girl",
                author : "The Weeknd",
                featuring : [],
                title : "Material girl",
                isLiked : false,
                trackPath: "songs/tracks/track3.mp3",
                trackCover: "songs/covers/cover3.png"
            },
            {
                id: 64686,
                name : "Khalid - Suncity ft Empress Of",
                author : "Khalid",
                featuring :[ "Empress Of"],
                title : "Suncity",
                isLiked : false,
                trackPath: "songs/tracks/track4.mp3",
                trackCover: "songs/covers/cover4.jpg"
            }
        ],
        playlist : [12345, 34567, 36431, 64686],
        activeTrackId : 34567,
        isPlaying : false,
        activeTrackDuration : 0,
        activeTrackCurrentTime : 0,
        isTracklistOpen: false
    },
    computed : {
        activeTrack : function() {
            return this.trackList.find( el => el.id == this.activeTrackId )
        }
    },
    methods : {
        setPlay : function() {
            document.getElementById('app__audio').play()
            this.isPlaying = true

        },
        setPause : function() {
            document.getElementById('app__audio').pause()
            this.isPlaying = false

        },
        setTrackDuration : function(){
            let globalThis = this
            document.getElementById('app__audio').addEventListener('loadedmetadata', function(){
                globalThis.activeTrackDuration = Math.round(this.duration)
            }, false)
        },
        setTrackId : function(el) {
            document.getElementById('app__audio').pause()
            this.activeTrackId = el
            document.getElementById('app__audio').load()
            document.getElementById('app__audio').play()
            this.isPlaying = true
            this.setTrackDuration()
        },
        setTrack: function(move){
            document.getElementById('app__audio').pause()
            let trackIdIndex = this.playlist.findIndex(el => el == this.activeTrackId)
            let totalTrack = this.playlist.length
            if (move == "prev") {
                if (trackIdIndex == 0)
                {
                    trackIdIndex = totalTrack - 1
                } else {
                    trackIdIndex--
                }
            } else if (move == "next") {
                if (trackIdIndex == totalTrack - 1)
                {
                    trackIdIndex = 0
                } else {
                    trackIdIndex++
                }
            }
            this.activeTrackId = this.playlist[trackIdIndex]
            document.getElementById('app__audio').load()
            document.getElementById('app__audio').play()
            this.isPlaying = true
        },
        onTimeUpdateListener : function() {
            this.activeTrackCurrentTime = this.$refs.audio.currentTime
        },
        setCurrentTime : function(){
            let globalThis = this
            document.querySelector('.app__control_timer__slider').addEventListener('change', function(){
                globalThis.$refs.audio.currentTime = this.value
            }, false)
        },
        toggleTracklist : function(){
            this.isTracklistOpen = !this.isTracklistOpen
        }
    },
    filters : {
        formatTime : function(el){
            let minutes = Math.floor(el / 60)
            let seconds = Math.floor(el % 60)
            return `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`
        }
    },
    watch : {
        activeTrackCurrentTime : function(val){
            if (val == this.activeTrackDuration) {
                this.setTrack('next')
            }
        }
    },
    mounted () {
        this.setTrackId(this.activeTrackId)
        this.isPlaying = false
    }

})