import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { InternshipComponent } from '../pages/internship/internship.component';

const routes: Routes = [
  {
    path: '', loadChildren: '../pages/home/home.module#HomeModule'
  },
  {
    path: 'login', loadChildren: '../pages/login/login.module#LoginModule'
  },
  {
    path: 'register/:id', loadChildren: '../pages/register/register.module#RegisterModule'
  },
  {
    path: 'company', loadChildren: '../pages/company/company.module#CompanyModule'
  },
  {
    path: 'allcourses', loadChildren: '../pages/allCourses/allCourses.module#AllCoursesModule'
  },
  {
    path: 'userdashboard', loadChildren: '../pages/userDashboard/userDashboard.module#UserDashboardModule'
  },
  // {
  //   path: 'coursedetailspage/:id', loadChildren: '../pages/courseDetailsPage/courseDetailsPage.module#CourseDetailsPageModule',
  //   runGuardsAndResolvers: 'always'
  // },
  {
    path: 'course/:name', loadChildren: '../pages/courseDetailsPage/courseDetailsPage.module#CourseDetailsPageModule',
    runGuardsAndResolvers: 'always'
  },//modified by nandita
  {
    path: 'enrollmentpage/:id', loadChildren: '../pages/enrollmentPage/enrollmentPage.module#EnrollmentPageModule'
  },
  {
    path: 'enrollmentcourselandingpage/:id',
    loadChildren: '../pages/enrollmentCourseLandingPage/enrollmentCourseLandingPage.module#EnrollmentCourseLandingPageModule',
  },
  {
    path: 'courselearningpage/:id', loadChildren: '../pages/courseLearningPage/courseLearningPage.module#CourseLearningPageModule',
  },
  {
    path: 'coursetestpage/:id', loadChildren: '../pages/courseTestPage/courseTestPage.module#CourseTestPageModule',
  },
  {
    path: 'resetpassword/:token', loadChildren: '../pages/resetpassword/resetpassword.module#ResetPasswordModule'
  },
  {
    path: 'activate/:token', loadChildren: '../pages/activate/activate.module#ActivateModule'
  },
  {
    path: 'resendactivation', loadChildren: '../pages/resendActivation/resendActivation.module#ResendActivationModule'
  },
  {
    path: 'comingsoon', loadChildren: '../pages/comingsoon/comingsoon.module#ComingSoonModule'
  },
  {
    path: 'errorpage', loadChildren: '../pages/errorPage/errorPage.module#ErrorPageModule'
  },
  {
    path: 'ourstory', loadChildren: '../pages/ourstory/ourstory.module#OurStoryModule'
  },
  {
    path: 'contactus', loadChildren: '../pages/contactus/contactus.module#ContactUsModule'
  },
  {
    path: 'profilepage', loadChildren: '../pages/profilepage/profilePage.module#ProfilePageModule'
  },
  {
    path: 'ourteam', loadChildren: '../pages/ourteam/ourteam.module#OurTeamModule'
  },
  {
    path: 'career', loadChildren: '../pages/career/career.module#CareerModule'
  },
  {
    path: 'donate', loadChildren: '../pages/donate/donate.module#DonateModule'
  },
  {
    path: 'services', loadChildren: '../pages/skillsgrowServices/skillsgrowServices.module#SkillsgrowServicesModule'
  },
  {
    path: 'skillsgrowAPI', loadChildren: '../pages/skillsgrowAPI/skillsgrowAPI.module#SkillsgrowAPIModule'
  },
  {
    path: 'howSkillsgrowWorks', loadChildren: '../pages/howSkillsgrowWorks/howSkillsgrowWorks.module#HowSkillsgrowWorksModule'
  },
  {
    path: 'referFriend', loadChildren: '../pages/referFriend/referFriend.module#ReferFriendModule'
  },
  {
    path: 'bulkpurchasing', loadChildren: '../pages/bulkpurchasing/bulkPurchasing.module#BulkPurchasingModule'
  },
  {
    path: 'prepaidCertification', loadChildren: '../pages/prepaidCertification/prepaidCertification.module#PrePaidCertificationModule'
  },
  {
    path: 'publishSkillsgrow', loadChildren: '../pages/publishSkillsgrow/publishSkillsgrow.module#PublishSkillsgrowModule'
  },
  {
    path: 'contactEnterpriseTeam', loadChildren: '../pages/contactEnterpriseTeam/contactEnterpriseTeam.module#ContactEnterpriseTeamModule'
  },
  {
    path: 'faq', loadChildren: '../pages/faq/faq.module#FaqModule'
  },
  {
    path: 'response/:id', loadChildren: '../pages/response/response.module#ResponseModule'
  },
  {
    path: 'internship/:id', loadChildren: '../pages/internship/internship.module#InternshipModule'
  },
  {
    path: '**', redirectTo: '/errorpage', pathMatch: 'full'
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules})
  ]
})
export class AppRoutingModule { }
