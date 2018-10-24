import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../../models/post.model";
import { CreateSongModalPage } from "../../pages/create-song-modal/create-song-modal.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-youtube-search-result',
  templateUrl: './youtube-search-result.component.html',
  styleUrls: ['./youtube-search-result.component.scss']
})
export class YoutubeSearchResultComponent implements OnInit {
  @Input()
  item: itemS;
  selectedSong: Post;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  selectSong(songId: string, artistName: string, songName: string, albumArt: string) {
    let currentSong = new Post(songId, artistName, songName, albumArt, "");
    this.selectedSong = currentSong;
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateSongModalPage,
      componentProps: {
        songName: this.selectedSong.songName,
        artistName: this.selectedSong.artistName,
        albumArt: this.selectedSong.albumArt
      }
    });
    return await modal.present();
  }
}