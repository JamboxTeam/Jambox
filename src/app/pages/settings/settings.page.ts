import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { Router } from '@angular/router';
import SpotifyWebApi, * as spotify from 'spotify-web-api-js'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user:any;
  spotifyApi:any
  constructor(public spotifyService: SpotifyService, private auth: FirebaseAuthService, private router: Router) {
    this.spotifyApi = new SpotifyWebApi();
  }

  ngOnInit() {
    this.spotifyService.getLoggedInUser().subscribe(user => {
      this.user = user
    })
  }
  exit() {
    this.router.navigate(['profile'])
  }

}
