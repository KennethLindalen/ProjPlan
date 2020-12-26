import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import AccountService from '@/account/account.service';
import axios from 'axios';

@Component
export default class Home extends Vue {
  @Inject('accountService')
  private accountService: () => AccountService;
  public authenticationError = null;
  public login = null;
  public password = null;
  public rememberMe: boolean = null;

  public doLogin(): void {
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
          }
        }
        this.authenticationError = false;
        this.accountService().retrieveAccount();
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
