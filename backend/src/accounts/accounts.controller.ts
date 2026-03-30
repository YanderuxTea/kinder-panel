import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/role-decorator.dto.js';
import { GetAccounts } from './dto/get-accounts.dto.js';
import { FetchMoreAccounts } from './dto/fetch-more-accounts.dto.js';
import { CreateAccount } from './dto/create-account.dto.js';
import { DeleteAccount } from './dto/delete-account.dto.js';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('get-accounts')
  getAccounts(@Body() dto: GetAccounts) {
    return this.accountsService.getAccounts(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('fetch-more-accounts')
  fetchMoreAccounts(@Body() dto: FetchMoreAccounts) {
    return this.accountsService.fetchMoreAccounts(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('create-account')
  createAccount(@Body() dto: CreateAccount) {
    return this.accountsService.createAccount(dto);
  }
  @UseGuards(AuthGuard)
  @Roles('sad_admin')
  @Post('delete-account')
  deleteAccount(@Body() dto: DeleteAccount) {
    return this.accountsService.deleteAccount(dto);
  }
}
