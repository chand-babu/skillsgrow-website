import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-our-team',
    templateUrl: './ourteam.component.html',
})

export class OurTeamComponent implements OnInit {
    public ourTeamMember: any[];

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        this.ourTeamMember = [
            {
                name: 'Sri Kumar',
                photo: 'ceo.jpg',
                aboutTeamMember: 'Srikumar started Skillsgrow in 2016 to help his students gain employment by providing free job ready learning programs. In addition to setting the vision and direction for Skillsgrow, he still loves giving lectures at various schools and colleges in India. A law graduate and Rotary International Scholar, Sri has the distinction of serving as the lead faculty of British Council in their corporate learning division in Chennai.',
                occupation: 'Founder & CEO'
            },
            {
                name: 'Dr. Manoj',
                photo: 'dr-manoj.jpg',
                aboutTeamMember: "Dr. Manoj believes solutions to the world's toughest problems could be locked in the mind of a student without access to a high quality education. An accomplished entrepreneur, he is mentoring Skillsgrow in how technology can be used for social good. His passion in life is contributing to projects with strong missions.Outside of work, he enjoys exploring new places, exploring new ideas, and trying new food.",
                occupation: 'Mentor'
            },
            {
                name: 'Dr. VSR Vijayakumar',
                photo: 'Vijayakumar.jpg',
                aboutTeamMember: 'Dr. VSR Vijayakumar is a PhD in Psychology from University of Madras and is the chief mentor of Skillsgrow. He has served in several institutions such as Madras Christian College, PSG college of Arts and Science, Department of Psychology University of Madras, Kirloskar Institute of Advanced Management Studies, ICFAI Business School as faculty member and as Senior Professor of Organizational Behavior and Management from Institute of Management Technology-Nagpur.',
                occupation: 'Mentor'
            },
            {
                name: 'Ganesan',
                photo: 'skillsgrowteam1.jpg',
                aboutTeamMember: "Ganesan joined Skillsgrow to help ensure its long-term sustainability. He is excited to focus on making Skillsgrow’s incredible Game Based Learning content available to maximum students. As team manager, Ganesan leads the team responsible for expanding reach of Skillsgrow via partnerships, including working with colleges/schools and teachers to integrate Skillsgrow learning content into the academic curriculum Previously, he worked in Maldives for 16 years as a teacher and administrative officer. Ganesan, believes sincerely that education is the singular tool that can transform the young India. ",
                occupation: 'Manager - Learning & Development'
            },
            {
                name: 'Shruthi',
                photo: 'skillsgrowteam3.jpg',
                aboutTeamMember: "Shruti is excited about teaching and she is a learning mentor at Skillsgrow. Coming from an illustrious family of teachers, having a good education changed her life and she is now using her teaching skills to inspire and motivate thousands of her students. Shruthi received her undergraduate degree at Bharath University, where she majored in Biomedical Sciences.",
                occupation: 'Training Mentor'
            },
            {
                name: 'Roshan',
                photo: 'roshan.JPG',
                aboutTeamMember: "Roshan works with our video tutorials team, where he thinks about how to help students and colleges inspire a lifetime love of learning. A engineering geek at heart, Roshan had previously used his creative skills to write film scripts and directing short movies. At Skillsgrow, he uses the power of films and online learning to understand how people can learn most effectively and have fun while doing it.",
                occupation: 'Video Content Specialist'
            },
            {
                name: 'Sai Sumanth',
                photo: 'skillsgrowteam2.jpg',
                aboutTeamMember: 'Sai is super excited to be working with the great team at Skillsgrow to improve education for everyone, everywhere.  An engineering student, Sai is a big fan of learning and teaching by using online technology and how it can bring employment opportunities to so many young students in India and all over the world.',
                occupation: 'Instructional Designer'
            },
            {
                name: 'Teja',
                photo: 'skillsgrowteam4.jpg',
                aboutTeamMember: 'Teja works with the Instructional team to bring great content to more students and classrooms.An Engineer by profession, Teja enjoys travelling, watching and playing cricket, and is always up to dabble in something he has never done before.',
                occupation: 'Program Associate'
            },
            {
                name: 'Ravi Teja',
                photo: 'skillsgrowteam6.jpg',
                aboutTeamMember: 'Ravi is a Product Analyst at Skillsgrow. He uses data to help our content and training team make better decisions for our learners. When not puzzling over analytical questions, he likes to help organize live corporate events in Skillsgrow',
                occupation: 'Product Analyst'
            },
            {
                name: 'Ajay',
                photo: 'skillsgrowteam5.jpg',
                aboutTeamMember: 'Ajay is an instructional developer working with the learning platform team at Skillsgrow. Passionate about education, Ajay is excited to work with an incredible team that wants to provide free, world-class education to everyone, everywhere..',
                occupation: 'Instructional Developer'
            },
            {
                name: 'Hemanth Sai Vardhan',
                photo: 'hemanth.jpg',
                aboutTeamMember: 'Hemanth Sai Vardhan works in the E-learning Content team at Skillsgrow. He is studying as an engineering day scholar and is fascinated by the impact Skillsgrow is making in uplifting the lives of so many young students in India. He loves learning new things and being a creative human being. In his free time, he is interested in social networking and loves reading about cyber security.',
                occupation: 'Content Creator'
            },
        ];
    }
}
