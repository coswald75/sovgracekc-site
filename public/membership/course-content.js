// Considering Membership — course content.
// Lesson bodies are the church's own articles, brought over from Medium.
// Blocks: {k:'p'} paragraph · {k:'q', ref} block quotation · {k:'pull'} pull quote · {k:'h'} subhead

export const course = {
  title: "Considering Membership",
  church: "Providence Community Church",
  city: "Lenexa",
  pastorEmail: "chris@sovgracekc.org",
  parts: [
    { n: "I", name: "Before We Begin", lessons: [1, 2, 3] },
    { n: "II", name: "What We Believe", lessons: [4, 5] },
    { n: "III", name: "What We Value", lessons: [6, 7, 8, 9, 10, 11, 12] },
    { n: "IV", name: "How We Live Together", lessons: [13, 14, 15, 16, 17, 18, 19, 20] }
  ],
  lessons: [
    {
      n: 1,
      title: "Considering Membership at Providence Community Church",
      standfirst: "Welcome to a series of articles exploring what it means to become a member of Providence Community Church.",
      mins: 1,
      url: "https://medium.com/@providencekc/considering-membership-at-providence-community-church-e9b9f19da862",
      passages: [],
      body: [
        { k: "p", t: "Welcome to a series of articles exploring what it means to become a member of Providence Community Church." },
        { k: "p", t: "Thanks in advance for investing your time into this series. We did our best write this material in a way that was both accessible while also being just a bit challenging. That’s what we love most about the Lord no? He opens his arms to us, gives us a big hug, and then encourages us to grow." },
        { k: "p", t: "We hope that by the end of this series, you’ll join us in feeling a newfound gratitude for the Lord’s commitment to his church. Maybe you will become a member of Providence or maybe you will decide to serve somewhere else. No matter how all of that plays out, it is beautiful to know that one day we will all be shoulder to shoulder with one another as we stand face to face with the Lord Jesus." },
        { k: "p", t: "Amen and let’s begin!" }
      ],
      reflect: [
        "What brought you to the point of considering membership somewhere? Tell us a little of your story.",
        "As you start, what are you hoping to find in a church family — and what are you cautious about?"
      ],
      check: {
        q: "What do the pastors hope you take away from this series?",
        options: [
          "A decision to join Providence, one way or another",
          "A renewed gratitude for the Lord’s commitment to his church",
          "A working knowledge of church history"
        ],
        answer: 1,
        why: "The aim is gratitude for Christ’s commitment to his church — whether you end up at Providence or serving somewhere else."
      },
      discuss: "Before you read any further, talk about what you each want out of a church. Where do your hopes line up, and where are they different?"
    },
    {
      n: 2,
      title: "Why Church Membership?",
      standfirst: "The importance of the church is a question too often overlooked. Before we ask about membership, we ask what God is doing with his people.",
      mins: 6,
      url: "https://medium.com/@providencekc/why-church-membership-1fc0bb103495",
      passages: [
        "Genesis 1:26–28", "Genesis 3:15", "Genesis 12:2", "Genesis 17:7", "Exodus 19:4–6",
        "Ezekiel 36:22–28", "Malachi 3:1", "John 1:14", "Acts 2", "1 Corinthians 3:16",
        "Revelation 21:1–4", "1 Peter 2:9–10", "2 Corinthians 6:16", "1 Corinthians 12:27",
        "Matthew 16:18", "1 Timothy 3:15"
      ],
      body: [
        { k: "p", t: "When it comes to the Christian life, the question of the church’s importance is perhaps one that is too often overlooked. The idea of “church” is often just assumed: churches persist, church members regularly (or not so regularly) attend, and things proceed on course. But how often do we stop and think, “Why is the church so important? What is the purpose of the church?” The answer to such questions will provide us both direction for how churches should build and encouragement to be faithful as we play our part in the body of Christ." },
        { k: "p", t: "In this article, we will explore the “big picture” of God’s purpose in the church at large, the critical role that the local church plays in God’s purposes, and the importance of formal membership in the local church. In so doing, we will hopefully see more clearly the glorious purposes God has for His church and the unspeakable privilege our participation in this journey truly is." },
        { k: "h", t: "God’s purpose, from creation to consummation" },
        { k: "p", t: "God’s intentions for the church span from the beginning of creation until its consummation, as he works out his eternal purpose to dwell among a people he has made his own." },
        { k: "p", t: "Genesis 1–2 lay the foundations for the rest of human history. In the beginning, God’s creative activity reached its pinnacle with the creation of man who, created in God’s image, was made to enjoy unhindered fellowship with his Creator (Genesis 1:26–28; 2:7, 15–17; 3:8)." },
        { k: "pull", t: "Of all the blessings Adam enjoyed in the garden — safety, provision, human companionship — the greatest was divine companionship." },
        { k: "p", t: "Even after man sinned and lost the privilege of intimate fellowship with God (Genesis 3:24), God pledged to vanquish the evil that had spoiled his creation, thus restoring mankind to his rightful place in creation in fellowship with God (Genesis 3:15)." },
        { k: "p", t: "God gave specific expression to his promise by revealing himself to Abraham and calling Abraham to himself. God’s promised blessings to Abraham including making of him “a great nation” (Genesis 12:2). God pledged himself to Abraham and his offspring, promising to be their God and to make them his people." },
        { k: "q", ref: "Genesis 17:7", t: "And I will establish my covenant between me and you and your offspring after you throughout their generations for an everlasting covenant, to be God to you and to your offspring after you." },
        { k: "p", t: "After Abraham’s descendants were enslaved in Egypt, God delivered them and forged them into a nation — the nation of Israel — among whom he would dwell, and who would represent him in the earth." },
        { k: "q", ref: "Exodus 19:4–6", t: "You yourselves have seen what I did to the Egyptians, and how I bore you on eagles’ wings and brought you to myself. Now therefore, if you will indeed obey my voice and keep my covenant, you shall be my treasured possession among all peoples, for all the earth is mine; and you shall be to me a kingdom of priests and a holy nation." },
        { k: "p", t: "Despite receiving many blessings from God (his presence in the tabernacle and temple, possession of the promised land, and the glories of Solomon’s reign), Israel’s rebellion and idolatry finally brought judgment upon the nation. Nonetheless, God did not abandon his people, but remained faithful to his covenant promises." },
        { k: "p", t: "During the exile, God pledged to restore the nation to the land and renew the hearts of his people." },
        { k: "q", ref: "Ezekiel 36:22–28", t: "Thus says the Lord GOD: It is not for your sake, O house of Israel, that I am about to act, but for the sake of my holy name . . . I will take you from the nations and gather you from all the countries and bring you into your own land. I will sprinkle clean water on you, and you shall be clean from all your uncleannesses, and from all your idols I will cleanse you. And I will give you a new heart, and a new spirit I will put within you . . . You shall dwell in the land that I gave to your fathers, and you shall be my people, and I will be your God." },
        { k: "p", t: "After the return from exile and the partial fulfillments of his promises, God promised to act again to dwell personally with his people." },
        { k: "q", ref: "Malachi 3:1", t: "Behold, I am going to send my messenger, and he will clear the way before me. And the Lord whom you seek, will suddenly come into His temple." },
        { k: "p", t: "In the incarnation, God revealed himself most fully and dwelt among his people in the most personal way possible through his son, Jesus Christ." },
        { k: "q", ref: "John 1:14", t: "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth." },
        { k: "p", t: "After Jesus’ ascension to the Father’s right hand and the sending of the Holy Spirit at Pentecost (Acts 2), the church — in union with Christ and indwelt by the Spirit — now becomes the divine sanctuary on earth where God dwells." },
        { k: "q", ref: "1 Corinthians 3:16", t: "Do you not know that you [pl.; i.e., the church] are God’s temple and that God’s Spirit dwells in you?" },
        { k: "p", t: "When Christ returns, God’s people will once again dwell with him and experience unhindered fellowship in his presence. God’s eternal purpose to dwell among a people he has made his own finds its consummation in the New Jerusalem (Revelation 21:1–4)." },
        { k: "h", t: "What the church is, now" },
        { k: "p", t: "At this stage in salvation-history, the people of God exist as the church — joined to Christ by faith and indwelt by the Spirit." },
        { k: "p", t: "The church exists as the people of God, belonging to him and representing him on the earth: “Once you were not a people, but now you are God’s people; once you had not received mercy, but now you have received mercy” (1 Peter 2:9–10)." },
        { k: "p", t: "The church is the unique dwelling place of God on earth: “For we are the temple of the living God” (2 Corinthians 6:16)." },
        { k: "p", t: "The church is the Body of Christ: deriving its life from him, vitally united to him, and finding its identity in him. As a result, members of Christ’s body are intimately related to each other as well — “Now you are the body of Christ and individually members of it” (1 Corinthians 12:27)." },
        { k: "h", t: "The exclusive role of the church" },
        { k: "p", t: "The church is God’s chosen means for carrying out his purposes until he returns. He has ordained no other organization or structure for this purpose." },
        { k: "q", ref: "Matthew 16:18", t: "I will build my church, and the gates of hell shall not prevail against it." },
        { k: "q", ref: "1 Timothy 3:15", t: "If I am delayed, you will know how people ought to conduct themselves in God’s household, which is the church of the living God, the pillar and foundation of the truth." }
      ],
      reflect: [
        "This article traces one thread from Eden to the New Jerusalem — God dwelling with a people he has made his own. Where do you find yourself in that story?",
        "Has church felt more like an optional add-on to your faith, or like part of what God is doing? Be honest about why."
      ],
      check: {
        q: "According to the article, what is God’s eternal purpose that runs from creation to the New Jerusalem?",
        options: [
          "To dwell among a people he has made his own",
          "To give his people a set of laws to keep",
          "To establish one nation over all others"
        ],
        answer: 0,
        why: "Every stage — Eden, Abraham, Israel, the incarnation, Pentecost, the new heaven and earth — advances God’s purpose to dwell with his own people."
      },
      discuss: "Read Revelation 21:1–4 out loud together. What does it change about this Sunday to know that is where the church is headed?"
    },
    {
      n: 3,
      title: "Why Church Membership, 2",
      standfirst: "Why should I join a local church?",
      mins: 9,
      url: "https://medium.com/@providencekc/why-church-membership-2-625f6e6f0104",
      passages: ["Romans 12:5", "Acts 2:47", "Acts 5:13", "1 Corinthians 14:23", "Acts 20:28", "1 Timothy 5:9", "Matthew 18:15–17", "1 Corinthians 5", "1 Timothy 5:17–18", "1 Corinthians 9:13–14", "1 Corinthians 12:27", "Ephesians 2:21", "1 Timothy 3:15", "Mark 8:38", "1 John 2:19", "Ephesians 4:15–16", "Hebrews 3:12–13", "Hebrews 10:24–25", "1 Corinthians 12:4–7", "1 Peter 4:10–11", "Ephesians 4:11–14", "2 Timothy 3:16–4:2", "1 Peter 2:9–10"],
      body: [
        { k: "p", t: "Why go to all this trouble to learn about this church? Does it really matter if I actually join a church? Am I not already a member of “the church”? Isn’t my personal relationship with Jesus what really matters? Such questions are common, and not altogether surprising given our individualistic culture and natural tendency towards independence. However, such questions also reveal a misunderstanding about the church and God’s purposes in and through the church." },
        { k: "pull", t: "God’s specific purposes for his people are accomplished as individuals join themselves to and participate in local churches." },
        { k: "p", t: "While all genuine believers are members of the universal body of Christ, they are to express this tangibly through membership in a specific local church." },
        { k: "h", t: "Church membership is biblical" },
        { k: "p", t: "Theologically, Christian conversion implies incorporation: incorporation into the Body of Christ — the church. Conversion by definition creates community." },
        { k: "q", ref: "Romans 12:5", t: "So we, though many, are one body in Christ, and individually members one of another." },
        { k: "p", t: "Membership — the recognition of a clearly defined community of people — was the clear practice of the early church. Converts were “added” to a specific group of fellow believers that was numerically defined (Acts 2:47). Believers were a discernible group of people to which other believers “joined” themselves (Acts 5:13). And “the whole church” implies a totality comprising specified individuals (1 Corinthians 14:23)." },
        { k: "h", t: "An identifiable membership is the necessary condition for pastoral care" },
        { k: "q", ref: "Acts 20:28", t: "Pay careful attention to yourselves and to all the flock, in which the Holy Spirit has made you overseers, to care for the church of God, which he obtained with his own blood." },
        { k: "p", t: "Pastors are responsible to care for an identifiable group of people, and they will give an account for those committed to their care. In the same way, a specified “widows’ list” indicates that the church had responsibility for a specified membership (1 Timothy 5:9)." },
        { k: "h", t: "Membership is the necessary context for the sacraments" },
        { k: "p", t: "The sacraments given by Christ to the church — baptism and the Lord’s Supper — are “signs and seals” of the covenant of grace, pointing to Christ and his benefits, and confirming his promises to us. As “marks of the church,” they are only to be received by those who have trusted in Christ and are continuing in fellowship with him and his people." },
        { k: "p", t: "Rightly administering the sacraments requires an awareness of the spiritual condition of those who are participating. This requires identifiable, committed relationships between believers. We practice an open table, inviting any believers to participate with us, provided they have been baptized, made a credible profession of faith, are pursuing accountable fellowship and are not under church discipline." },
        { k: "q", ref: "Edmund Clowney", t: "These outward signs mark out a visible fellowship; they structure Christ’s church as a community with membership. Baptism requires a decision about admission to the community. The Supper, a sign of continuing fellowship, implies the exclusion of those who have turned away from the Lord… the sacraments testify that the church must have organized form as well as organic life." },
        { k: "h", t: "Membership is the assumed context for church discipline" },
        { k: "p", t: "Matthew 18:15–17 and 1 Corinthians 5 both describe situations in which believers are to confront other believers who are persisting in a sinful way of life. This can only refer to a situation in which Christians are joined together in an identifiable membership that is committed to live a godly lifestyle distinct from the world." },
        { k: "p", t: "Moreover, the final stage of church discipline (“excommunication”) involves the removal of an unrepentant person from formal membership in a visible, organized group (Matthew 18:17; 1 Corinthians 5:2, 9–13; cf. 1 Timothy 1:19–20; Titus 3:10–11)." },
        { k: "h", t: "Members are the primary source for the funding of gospel ministry" },
        { k: "p", t: "Believers are commanded to financially support the local church where they receive care and equipping." },
        { k: "q", ref: "1 Timothy 5:17–18", t: "Let the elders who rule well be considered worthy of double honor, especially those who labor in preaching and teaching. For the Scripture says, “You shall not muzzle an ox when it treads out the grain,” and, “The laborer deserves his wages.”" },
        { k: "q", ref: "1 Corinthians 9:13–14", t: "Do you not know that those who are employed in the temple service get their food from the temple, and those who serve at the altar share in the sacrificial offerings? In the same way, the Lord commanded that those who proclaim the gospel should get their living by the gospel." },
        { k: "h", t: "Membership is the clear implication of the Bible’s pictures of the church" },
        { k: "p", t: "The primary New Testament metaphors for the church — body (1 Corinthians 12:27), temple (Ephesians 2:21), household (1 Timothy 3:15), and flock (Acts 20:28) — have as a key characteristic the idea of separate individuals joined together into a single, identifiable entity." },
        { k: "q", ref: "Eric Lane", t: "God has given us four pictures of the church, not one. This is not just to emphasize and prove the point by repetition, but also to say four different things about what it means to be a member of a church. To be a stone in his temple means to belong to a worshipping community. To be a part of a body means to belong to a living, functioning, serving, witnessing community. To be a sheep in the flock means belonging to a community dependent on him for food, protection, and direction. To be a member of a family is to belong to a community bound by a common fatherhood. Put together you have the main functions of an individual Christian. Evidently we are meant to fulfill these not on our own but together in the church. Now can you see the answer to the question why you should join a church?" },
        { k: "h", t: "Membership identifies us with Christ and his people" },
        { k: "q", ref: "Mark 8:38", t: "For whoever is ashamed of me and of my words in this adulterous and sinful generation, of him will the Son of Man also be ashamed when he comes in the glory of his Father with the holy angels." },
        { k: "q", ref: "1 John 2:19", t: "They went out from us, but they were not of us; for if they had been of us, they would have continued with us. But they went out, that it might become plain that they all are not of us." },
        { k: "h", t: "Membership is vital to our spiritual health and growth" },
        { k: "p", t: "Without being joined together with other believers, we will lack the strength and nourishment that each member — including ourselves — is to supply to the whole body." },
        { k: "q", ref: "Ephesians 4:15–16", t: "Rather, speaking the truth in love, we are to grow up in every way into him who is the head, into Christ, from whom the whole body, joined and held together by every joint with which it is equipped, when each part is working properly, makes the body grow so that it builds itself up in love." },
        { k: "p", t: "We need other believers to help us in our fight with sin (Hebrews 3:12–13), and we each have a role to play in encouraging other believers — “not neglecting to meet together, as is the habit of some” (Hebrews 10:24–25)." },
        { k: "h", t: "Membership enables us to use our gifts for the good of others" },
        { k: "p", t: "The Holy Spirit has given every Christian spiritual gifts that are to be used in service of the church and its mission. The ordering of believers within the church to deploy their diversity of gifts for the good of the body is by divine design." },
        { k: "q", ref: "1 Corinthians 12:4–7", t: "Now there are varieties of gifts, but the same Spirit; and there are varieties of service, but the same Lord; and there are varieties of activities, but it is the same God who empowers them all in everyone. To each is given the manifestation of the Spirit for the common good." },
        { k: "q", ref: "1 Peter 4:10–11", t: "As each has received a gift, use it to serve one another, as good stewards of God’s varied grace: whoever speaks, as one who speaks oracles of God; whoever serves, as one who serves by the strength that God supplies — in order that in everything God may be glorified through Jesus Christ." },
        { k: "h", t: "Membership feeds us through the preaching of God’s word" },
        { k: "p", t: "God calls pastors to care for and equip his people, and the primary way they do this is through the teaching of God’s word (Ephesians 4:11–14; 2 Timothy 3:16–4:2)." },
        { k: "q", ref: "John Calvin", t: "We see how God, who could in a moment perfect his own, nevertheless desires them to grow up into manhood solely under the education of the Church… Many are led either by pride, dislike or rivalry to the conviction that they can profit enough from private reading and meditation; hence they despise public assemblies and deem preaching superfluous. This is like blotting out the face of God which shines upon us in teaching." },
        { k: "h", t: "Membership enables us more fully to glorify God" },
        { k: "p", t: "The church as a distinct and separate people proclaims the gospel, cares for its own, and through its life and witness displays the character of the One who saved us (1 Peter 2:9–10)." },
        { k: "pull", t: "All Christians have the privilege and responsibility to be a vital member of a specific local church." },
        { k: "p", t: "One can hardly say it better than Charles Spurgeon, who challenged his audience with the following:" },
        { k: "q", ref: "Charles Spurgeon", t: "I know there are some who say, “Well, I have given myself to the Lord, but I do not intend to give myself to any church.” Now, why not? “Because I can be a Christian without it.” Are you quite clear about that? You can be as good a Christian by disobedience to your Lord’s commands as by being obedient? There is a brick. What is it made for? To help build a house. It is of no use for that brick to tell you that it is just as good a brick while it is kicking about on the ground as it would be in the house. It is a good-for-nothing brick. So you rolling-stone Christians, I do not believe that you are answering your purpose." }
      ],
      check: {
        q: "Why does the article say an identifiable membership matters for pastoral care?",
        options: [
          "So the church can keep accurate attendance records",
          "Because pastors are responsible for a specific flock and will give an account for them",
          "Because only members are allowed to ask a pastor for help"
        ],
        answer: 1,
        why: "Acts 20:28 gives pastors charge of a particular flock — you cannot shepherd, or answer for, a group with no edges."
      },
      reflect: ["Is there anything about formally committing to one church that gives you pause? Name it plainly."],
      discuss: "Talk about the difference between attending a church and belonging to one."
    },
    {
      n: 4,
      title: "Gospel Centered & Reformed",
      standfirst: "There are certain characteristics all true churches share in common. At the same time, individual churches may be faithful to the gospel in different ways.",
      mins: 9,
      url: "https://medium.com/@providencekc/our-core-beliefs-part-1-32af7acc50fb",
      passages: ["1 Corinthians 15:1–4", "John 5:39", "Luke 24:44", "Romans 3:9–12, 23", "Hebrews 4:15", "Romans 3:23–26", "Mark 1:14–15", "Ephesians 2:8–9", "Philippians 2:12–13", "Ephesians 1:4–6", "Romans 8:30", "John 6:44", "Colossians 2:13", "Romans 8:28–32", "Acts 18:9–10", "2 Timothy 2:10"],
      body: [
        { k: "p", t: "There are certain characteristics all true churches share in common. At the same time, individual churches may be faithful to the gospel while differing from each other in theological emphases and ministry priorities. Some churches may be distinguished by their denominational affiliation: there are Baptists and Episcopalians, Presbyterians and Lutherans. Other churches distinguish themselves by their ministry priorities: some may emphasize international missions while others highlight discipleship. Some may place a premium on family ministry while others may make church planting their top priority. With so many fruitful, faithful churches in Kansas City, what makes Providence distinct?" },
        { k: "p", t: "This article highlights theological priorities deliberately emphasized by the pastors of Providence. Many of these priorities we share with other churches; in some cases it is the way we put them into practice that will distinguish us from other churches. It’s important to note that we derive no sense of superiority in the list that follows: these emphases simply express our understanding of biblical teaching and priorities. When other churches decide to highlight other priorities while remaining faithful to the gospel, we can thank God for them and commend them to other Christians with a clear conscience." },
        { k: "p", t: "Taking the broadest view possible, we are evangelical, by which we basically mean two things. First, we believe that the Bible is God’s inspired, inerrant word and is therefore our final authority in all matters of life and doctrine. Second, we believe that people are separated from God, and they need to be saved by responding to the gospel of Jesus Christ." },
        { k: "h", t: "The gospel is the center of the Christian faith" },
        { k: "p", t: "Unlike other religions, Christianity at its core isn’t about morality, philosophy, or self-fulfillment. Rather, it’s about news — good news. The greatest news that the world has ever heard. In fact, the word “gospel” literally means “good news,” and it is this news that the apostle Paul called a matter “of first importance”:" },
        { k: "q", ref: "1 Corinthians 15:1–4", t: "Now I would remind you, brothers, of the gospel I preached to you, which you received, in which you stand, and by which you are being saved… For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures…" },
        { k: "p", t: "The gospel announces all that God has done in Jesus Christ to save us. It is the good news of Christ’s incarnation, life, death, resurrection, and ascension. The gospel is therefore objective; it is a matter of history. It is what Christ did for us; no matter how we feel, the ground of our salvation never changes." },
        { k: "h", t: "The gospel is the organizing theme of Scripture" },
        { k: "p", t: "The Bible is not a mixed bag of books and ideas only loosely related to each other. The Bible tells a story: the story of a God and his relationship to his creation in general, and to humanity in particular. At the center of this story stands Jesus Christ and his saving work on our behalf (John 5:39; Luke 24:44)." },
        { k: "p", t: "As it unfolds the story of redemption, the Bible illuminates for us the nature of God — sovereign, holy, and loving — and the nature of mankind as well — isolated from God, corrupted by sin, and subject to his righteous wrath. It also reveals the grace of God — acting to restore all things back to himself through his Son — and how we can find forgiveness and be restored to a relationship with God, through repentance and faith in the finished work of Christ on the cross." },
        { k: "h", t: "The gospel is the exclusive message for the salvation of sinners" },
        { k: "p", t: "Every person stands guilty before God and separated from God because of sin: “None is righteous, no, not one… for all have sinned and fall short of the glory of God” (Romans 3)." },
        { k: "p", t: "Christ came to be our substitute: perfectly obeying God’s law in his life, and satisfying God’s justice through his death on the cross (Hebrews 4:15; Romans 3:23–26)." },
        { k: "q", ref: "John Stott", t: "How then could God express simultaneously his holiness in judgment and his love in pardon? Only by providing a divine substitute for the sinner, so that the substitute would receive the judgment and the sinner the pardon." },
        { k: "p", t: "It is only through trusting in Christ and his work (faith) and turning from our sins (repentance) that we can be saved (Mark 1:14–15)." },
        { k: "h", t: "The gospel is the governing reality for the life of believers" },
        { k: "p", t: "The gospel remains the basis for our acceptance before God (Ephesians 2:8–9). The gospel reminds us that God is at work in us to change us (Philippians 2:12–13). The gospel assures us that God will complete his work in us (Philemon 1:6)." },
        { k: "pull", t: "It will be the substance of our proclamation, the source of our motivation, and the fuel for our adoration." },
        { k: "p", t: "At Providence, our goal is to keep the gospel at the heart of all that we do. We will do all we can to ensure that our zeal for the gospel is never eclipsed by any other doctrine, teaching, or practice. Our commitment to you is that, with all our might, we will endeavor to “keep the main thing, the main thing.”" },
        { k: "h", t: "Reformed soteriology" },
        { k: "p", t: "All of the pastors at Providence share a conviction about the nature of the gospel. This perspective is sometimes called reformed soteriology. Let’s break that down. Firstly, the word soteriology is a theological term that refers to the doctrines of salvation. Meanwhile the word reformed refers to a high view of God’s sovereignty — specifically in the work of saving sinners." },
        { k: "p", t: "While all genuine Christians believe that one can only be saved through the gospel, sincere believers differ on their understanding of God’s part and man’s part in that saving act. At Providence, we understand salvation from the historic Reformed perspective, which places the emphasis on the activity of God and the glory of God in saving sinners." },
        { k: "h", t: "What makes our response to the gospel possible?" },
        { k: "p", t: "The gospel is good news because sin and judgment are such bad news. Sin is not only what we do, but who we are: apart from God, we are sinners by nature. So if we’re truly “dead” in our sins (Ephesians 2:1) and powerless to change, how is it that we are able to respond to the gospel at all? It is here that the gracious nature of salvation becomes even more amazing: God acts, so that we can act." },
        { k: "h", t: "When did God decide to save us?" },
        { k: "p", t: "God’s actions begin in eternity past when he chose us and determined that he would save us. This is often referred to as “election.”" },
        { k: "q", ref: "Ephesians 1:4–6", t: "For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us to be adopted as his sons through Jesus Christ, in accordance with his pleasure and will — to the praise of his glorious grace, which he has freely given us in the One he loves." },
        { k: "p", t: "God’s choosing of us eventually results in his calling us and drawing us to himself. This is sometimes referred to as “effectual calling” — God’s mysterious work of inviting and drawing sinners to himself by his Spirit through the proclamation of the gospel. While God is the one who draws, this does not mean that a person is somehow saved apart from their own willing response to the gospel. Through the grace of God, the “divine summons” of God makes possible the response it requires (Romans 8:30; John 6:44)." },
        { k: "p", t: "When God calls us, he then changes our heart so that we can freely respond. This change is called “regeneration.” In regeneration, God acts to change our inner nature and impart spiritual life to us. As a result, we become spiritually alive and are then able to believe the gospel and repent of our sin: “When you were dead in your sins… God made you alive with Christ” (Colossians 2:13)." },
        { k: "q", ref: "Mark Dever", t: "Scripture is clear in teaching that we are not all journeying toward God — some having found him, others still seeking. Instead, Scripture presents us as needing to have our hearts replaced, our minds transformed, our spirits given life. We can do none of this for ourselves. The change each human needs, regardless of how we may outwardly appear, is so radical, so near our roots, that only God can bring it about. We need God to convert us." },
        { k: "q", ref: "Charles Spurgeon", t: "I believe in the doctrine of election, because I am quite certain that, if God had not chosen me, I should never have chosen him; and I am sure he chose me before I was born, or else he never would have chosen me afterwards; and he must have elected me for reasons unknown to me, for I never could find any reason in myself why he should have looked upon me with special love." },
        { k: "h", t: "Why this matters in practice" },
        { k: "p", t: "We hold to a Reformed soteriology because we believe it represents the clear teaching of Scripture. But these doctrines also have important practical effects on our lives. They bring glory to God by eliminating all human boasting in salvation (Ephesians 2:8–9). They cause us to marvel at our salvation and produce adoring, God-centered worship (Ephesians 1:3–14). They make us secure in the unchanging purposes of God (Romans 8:28–32). And they fuel evangelism, giving us confidence that God will indeed save his people, while removing the pressure to argue anyone into the kingdom (Acts 18:9–10; 2 Timothy 2:10)." }
      ],
      check: {
        q: "What does the article mean by “God acts, so that we can act”?",
        options: [
          "God waits for us to take the first step toward him",
          "God changes our hearts so that we are able to believe and repent",
          "God saves people apart from any response of faith"
        ],
        answer: 1,
        why: "Because sin leaves us dead and powerless, God calls and regenerates first — and that work makes our free response possible."
      },
      reflect: ["Which parts of this were new to you, and which did you already hold?"],
      discuss: "Where did each of you first learn what you believe about salvation?"
    },
    {
      n: 5,
      title: "Baptistic, Continuationist, & Complimentarian",
      standfirst: "In the previous article, we discussed gospel-centeredness and reformed soteriology. In this article, we will discuss three other convictions.",
      mins: 9,
      url: "https://medium.com/@providencekc/core-beliefs-part-2-6ce865e2f645",
      passages: ["Acts 2:38", "Acts 8:12", "Romans 6:4", "Ezekiel 36:26–27", "John 3:3–8", "Galatians 5:16", "Galatians 5:22–23", "Psalm 119:18", "Ephesians 1:18–19", "1 Corinthians 14:1", "1 Peter 4:10–11", "John 15:26", "John 16:14–15", "Ephesians 5:18", "James 4:7–8", "Genesis 1:27", "Acts 2:17–18", "Ephesians 5:22–28", "1 Peter 3:7", "Genesis 2:20–25", "1 Timothy 2:12–14"],
      body: [
        { k: "p", t: "In the previous article, we discussed gospel-centeredness and reformed soteriology. In this article, we will discuss three other theological emphases at Providence: credo or believer’s baptism, the continuing work of the Holy Spirit, and complementary roles for males and females." },
        { k: "h", t: "1. Baptism" },
        { k: "p", t: "We practice “believers baptism”; in other words, we believe that baptism is only appropriate for those who give a credible profession of faith in Jesus Christ. All those who respond to the gospel with repentance and faith are also to obey the command to be baptized." },
        { k: "q", ref: "Acts 2:38", t: "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit." },
        { k: "p", t: "Baptism is therefore an obedient response of someone saved by grace. In baptism, we identify with the Lord who has saved us. Baptism cannot contribute to or bring about salvation. Baptism doesn’t save us — Jesus saves us through faith. “When they believed… they were baptized, both men and women” (Acts 8:12)." },
        { k: "p", t: "Baptism is an outward sign of an inward work which has already taken place. Therefore, only those who have believed the gospel and repented from their sins should be baptized. For this reason, we do not baptize infants." },
        { k: "p", t: "Water baptism is a sign and symbol of the believer’s union with the Lord in his death, burial, and resurrection." },
        { k: "q", ref: "Romans 6:4", t: "We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead through the glory of the Father, so too we may live a new life." },
        { k: "p", t: "We practice baptism by immersion which, in addition to being the likely practice of the New Testament church, vividly illustrates the believer’s identification with Christ in his death, burial, and resurrection." },
        { k: "p", t: "Baptism is a landmark moment in a believer’s life, clearly marking one’s identification with Christ and entrance into his body, the church. It is therefore our wonderful privilege as a church to celebrate these times together. We set aside specific times for the baptism of new believers (or those who haven’t yet been baptized), enabling us to rejoice together and to welcome new believers into the life of the church." },
        { k: "h", t: "2. The role of the Holy Spirit" },
        { k: "p", t: "The Christian life was never meant to be lived out in our own strength. Just as the Holy Spirit transforms our heart in salvation, he also empowers believers for Christian living, witness, and service. To say we’re “continuationist” means that we believe in the present day work of the Holy Spirit in the many ways that the Spirit is described and manifested in Scripture." },
        { k: "p", t: "Belief in the continuation of the Spirit’s powerful work sometimes narrows to a focus on the spectacular. However, the Bible portrays the Spirit’s work in broad, comprehensive terms as the Christian’s source of life and empowerment from first to last. Here are some of the main ways we can expect the Spirit’s work in our midst." },
        { k: "p", t: "Regeneration. The Christian life begins by the supernatural work of the Spirit. There is no greater miracle than that of regeneration (Ezekiel 36:26–27; John 3:3–8)." },
        { k: "q", ref: "Wayne Grudem", t: "Regeneration is a secret act of God in which he imparts new spiritual life to us." },
        { k: "p", t: "Progressive sanctification. The same Spirit that gives us new life continues to transform us that we might become more like Christ — “walk by the Spirit, and you will not gratify the desires of the flesh” (Galatians 5:16), bearing “love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control” (Galatians 5:22–23)." },
        { k: "p", t: "Illumination. Illumination is the Holy Spirit’s enabling of Christians generally to understand and to apply the truth of God’s word (Psalm 119:18; Ephesians 1:18–19)." },
        { k: "p", t: "Spiritual gifts. Spiritual gifts are means by which the Holy Spirit empowers and enables us to serve God and his people (1 Corinthians 14:1; 1 Peter 4:10–11). All spiritual gifts, from the spectacular to the seemingly mundane, are supernatural — they are equally from God, equally empowered by the Spirit, and vital for the edification of the church." },
        { k: "p", t: "Glorifying Christ. The most important work of the Holy Spirit is to reveal, illuminate, and exalt the work of Jesus Christ (John 15:26; John 16:14–15). By opening blind eyes to see the glory of Christ, by transforming hard hearts to turn from sin and trust in his cross-work, and by uniting us to Christ in his death and resurrection, the Spirit makes fellowship with Christ and the Father an experienced reality." },
        { k: "pull", t: "The work of the Holy Spirit isn’t simply a doctrine to be acknowledged, but a way of life to be pursued." },
        { k: "p", t: "In short, this doctrine implies a life of dependence. Although we may differ on some details about the Spirit’s work, we believe we will be able to serve fruitfully together if we share a few central values: a recognition of our need for ongoing empowerment by the Spirit in our lives; a conviction that Christians are to seek to be continually filled by the Spirit; a belief in the continuity of the spiritual gifts listed in Scripture, and an earnest desire for whatever gifts the Spirit would graciously give; and a love for, and pursuit of, the active presence of God (Ephesians 5:18; 1 Corinthians 14:1; James 4:7–8)." },
        { k: "h", t: "3. Complementary roles for males and females" },
        { k: "p", t: "“Complementarian” is a sort of theological shorthand for the view that the Bible teaches that God created men and women equal in personhood, value, and dignity, but different in certain roles and functions in both the home and the church. This view arises out of a careful reading of Genesis 1–2." },
        { k: "p", t: "Equality in personhood, value, and dignity. Adam and Eve were both made in the image of God and thus share equally in value and dignity: “male and female he created them” (Genesis 1:27). At Pentecost the Spirit is poured out on sons and daughters alike (Acts 2:17–18)." },
        { k: "p", t: "Because of this fundamental equality, there should be no sense of superiority or inferiority, or resentment, or competition between men and women; both are deserving of mutual respect and honor (Ephesians 5:25–28; 1 Peter 3:7)." },
        { k: "p", t: "Men and women are different in their (equally valuable) roles and functions. Adam was made first, and Eve was made from man and given to him as a helper (Genesis 2:20–25). The New Testament applies the foundational teaching of Genesis 1–3 to differing roles in the home and church, concluding that leadership — which must be exercised in light of the truth of our equal value before God — in both is male (Ephesians 5:22–25; 1 Timothy 2:12–14; see also 1 Corinthians 11:2–12; 14:33–36; 1 Timothy 3:1–7; Titus 1:5–9)." },
        { k: "pull", t: "The range of service in the church that is reserved for men is actually quite narrow." },
        { k: "p", t: "Too often, the debate over women and leadership in the church rages over what women can’t do. There are numerous and vital ways for both women and men to use their gifts in the church: “As each has received a gift, use it to serve one another, as good stewards of God’s varied grace” (1 Peter 4:10–11)." }
      ],
      check: {
        q: "Why does Providence not baptize infants?",
        options: [
          "Because baptism is an outward sign of a work God has already done in a believer",
          "Because infants cannot be immersed safely",
          "Because baptism is what saves a person"
        ],
        answer: 0,
        why: "Baptism marks an inward work that has already taken place, so it follows a credible profession of faith — it does not cause salvation."
      },
      reflect: ["Of these three convictions, which would you most want to ask a pastor about?"],
      discuss: "Which of these three have you had the most exposure to? The least?"
    },
    {
      n: 6,
      title: "Applying the Gospel",
      standfirst: "Visit different churches and you’ll invariably find different emphases. This isn’t wrong — we all have different parts to play in the body.",
      mins: 3,
      url: "https://medium.com/@providencekc/applying-the-gospel-1381e2ca65c4",
      passages: ["Matthew 22:35–40", "Matthew 28:18–20", "Luke 24:44", "John 5:39", "Philippians 1:27"],
      body: [
        { k: "p", t: "Visit different churches and you’ll invariably find different emphases. This isn’t wrong — we all have different parts to play in the body of Christ. However, Christ didn’t leave his church without instructions. Here are two of the main ones." },
        { k: "q", ref: "Matthew 22:35–40 · The Great Commandment", t: "You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbor as yourself. On these two commandments depend all the Law and the Prophets." },
        { k: "q", ref: "Matthew 28:18–20 · The Great Commission", t: "All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you. And behold, I am with you always, to the end of the age." },
        { k: "p", t: "These instructions suggest three key dimensions of the church’s life: a vertical dimension (loving and worshipping God), an internal dimension (loving and nurturing each other as followers of Christ), and an external dimension (bringing the gospel to those who don’t know Christ)." },
        { k: "p", t: "While all true churches seek to be faithful to these different aspects of Christ’s commands, no two churches will pursue them in exactly the same way. At Providence, we have identified a few main priorities to help us be faithful to Christ’s call. These priorities shape our life together and give rise to the kinds of activities we pursue individually and as a church. Understanding these values will give you a good sense of the kind of church we’re seeking to build." },
        { k: "h", t: "What do we mean by “applying the gospel”?" },
        { k: "p", t: "Although we say this often, “applying the gospel” is no mere slogan. It’s a thumbnail summary of what it means to “observe all that [Jesus] commanded,” in light of his person, teaching, and work." },
        { k: "p", t: "This seeks to honor Jesus’ claims that all of Scripture points in some way to him (Luke 24:44; John 5:39). And it follows the New Testament’s practice of rooting the Christian life in all its dimensions to Christ’s person and work — see 1 Corinthians 6:18–20; 2 Corinthians 8:7, 9; Galatians 2:14; Philippians 2:5–11; Ephesians 4:32; 5:25–33; Colossians 3:12–13; Hebrews 12:1–6; 1 Peter 2:13–25." },
        { k: "q", ref: "Philippians 1:27", t: "Whatever happens, conduct yourselves in a manner worthy of the gospel of Christ. Then, whether I come and see you or only hear about you in my absence, I will know that you stand firm in one spirit, contending as one man for the faith of the gospel." },
        { k: "pull", t: "Biblically informed, grace motivated, and Christ exalting." },
        { k: "p", t: "We desire Providence to be a community that views all of the Christian life — our beliefs, values, and obedience — through the lens of Christ’s person and work. This involves making real connections between the gospel and the thinking and behavior that make up our daily lives." }
      ],
      check: {
        q: "What three dimensions of church life do the Great Commandment and Great Commission suggest?",
        options: [
          "Preaching, singing, and giving",
          "Vertical, internal, and external",
          "Local, regional, and global"
        ],
        answer: 1,
        why: "Vertical (worshipping God), internal (nurturing one another), external (bringing the gospel to those outside)."
      },
      reflect: ["Where do you most need the gospel applied to your own life right now?"],
      discuss: "What would it look like for someone to help you apply the gospel this month?"
    },
    {
      n: 7,
      title: "Exegetical Preaching",
      standfirst: "Hopefully we all agree that God has ordained that his word be the saving and sanctifying instrument of his people.",
      mins: 4,
      url: "https://medium.com/@providencekc/exegetical-preaching-292171743fa7",
      passages: ["Romans 10:14, 17", "John 17:17", "2 Timothy 3:16–4:2"],
      body: [
        { k: "p", t: "Hopefully we all agree that God has ordained that his word be the saving and sanctifying instrument of his people." },
        { k: "q", ref: "Romans 10:14, 17", t: "How then will they call on him in whom they have not believed? And how are they to believe in him of whom they have never heard? And how are they to hear without someone preaching? … So faith comes from hearing, and hearing through the word of Christ." },
        { k: "q", ref: "John 17:17", t: "Sanctify them in the truth. Your word is truth." },
        { k: "h", t: "Preaching is God’s appointed means" },
        { k: "p", t: "We also see that God has ordained preaching as the unique means by which his word is brought effectively to his church. Throughout salvation-history, God has chosen to transmit his word to his people through commissioned servants." },
        { k: "q", ref: "J. I. Packer", t: "God’s standard way of securing and maintaining his person-to-person communication with us his human creatures is through the agency of persons whom he sends to us as his messengers… That is the succession in which preachers today are called to stand." },
        { k: "h", t: "Exegesis, not eisegesis" },
        { k: "p", t: "Everywhere we see the church in the New Testament, we see the regular teaching and preaching of God’s word. And not just any kind of preaching. What we see time and again is what is sometimes called exegetical preaching." },
        { k: "p", t: "The two words are worth learning. Eisegesis means “to lead into” — reading our own ideas into the text. Exegesis means “to draw out” — drawing out of the text what is actually there. Barry Cooper illustrates it well in Ligonier’s Simply Put podcast: the small group member who steers every passage back to a favorite subject, whether predestination or God’s love or care for the poor. All of those things are in the Bible; they are not in every verse." },
        { k: "p", t: "So the question is not how we can make a text say what we want it to say, but how we can get out of the way and let the text speak for itself. Will we allow it to challenge our ideas, or are we really only interested in confirming them?" },
        { k: "q", ref: "Charles Simeon", t: "My endeavor is to bring out of Scripture what is there, and not to thrust in what I think might be there. I have a great jealousy on this head: never to speak more or less than I believe to be the mind of the Spirit in the passage I am expounding." },
        { k: "pull", t: "We mould the Bible into our own image, rather than allowing it to mould us." },
        { k: "p", t: "That is the danger. It is as if we have already decided what Scripture should and should not say before we open it — and when we do open it, lo and behold, it confirms all our prejudices and always agrees with us. Given that this is God’s word and not ours, that ought to make us suspicious about our ability to read." },
        { k: "p", t: "As one theologian put it, to exegete “is to bring out of the text what is there and expose it to view. The expositor pries open what appears to be closed, makes plain what is obscure, unravels what is knotted and unfolds what is tightly packed.” The opposite of exposition is imposition." },
        { k: "q", ref: "2 Timothy 3:16–4:2", t: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work… preach the word; be ready in season and out of season; reprove, rebuke, and exhort, with complete patience and teaching." }
      ],
      check: {
        q: "What is the difference between exegesis and eisegesis?",
        options: [
          "Exegesis draws out what the text says; eisegesis reads our own ideas into it",
          "Exegesis is for scholars; eisegesis is for ordinary readers",
          "Exegesis works verse by verse; eisegesis works book by book"
        ],
        answer: 0,
        why: "One lets the text speak and challenge us; the other makes the text agree with what we already thought."
      },
      reflect: ["How has preaching shaped you — for better or worse — up to now?"],
      discuss: "How do you each listen to a sermon? Compare notes."
    },
    {
      n: 8,
      title: "Every Member Serving",
      standfirst: "There are to be no passive participants in the church. One of the primary reasons God saves us is to rescue us from an existence turned in on itself.",
      mins: 5,
      url: "https://medium.com/@providencekc/every-member-serving-7d6b95f7977c",
      passages: ["Hebrews 9:14", "Philippians 2:5–8", "Mark 10:43–45", "1 Peter 4:10–11", "Ephesians 4:11–13", "Matthew 28:18–20", "Ephesians 4:15–16", "Colossians 3:16", "Romans 12:5", "1 Corinthians 12:24–26", "Hebrews 10:24–25", "John 13:35"],
      body: [
        { k: "p", t: "There are to be no passive participants in the church. Indeed, one of the primary reasons God saves us is to rescue us from an existence leading to death and to set us free to serve him with joy." },
        { k: "q", ref: "Hebrews 9:14", t: "…how much more will the blood of Christ, who through the eternal Spirit offered himself without blemish to God, purify our conscience from dead works to serve the living God." },
        { k: "h", t: "Servanthood is modeled by Jesus’ example" },
        { k: "q", ref: "Philippians 2:5–8", t: "Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, by taking the form of a servant… he humbled himself by becoming obedient to the point of death, even death on a cross." },
        { k: "h", t: "Servanthood is mandated by Jesus’ call" },
        { k: "q", ref: "Mark 10:43–45", t: "But it shall not be so among you. But whoever would be great among you must be your servant, and whoever would be first among you must be slave of all. For even the Son of Man came not to be served but to serve, and to give his life as a ransom for many." },
        { k: "p", t: "Service in the church is empowered by the Spirit of God (1 Peter 4:10–11), and equipping members for service is the call of pastors — “to equip the saints for the work of ministry, for building up the body of Christ” (Ephesians 4:11–13)." },
        { k: "h", t: "Intentional relationships" },
        { k: "p", t: "Just as the Christian life isn’t to be passive, neither is it to be isolated. Because the Holy Spirit at conversion joins us to Christ’s body, our relationships are to be marked by this reality. We don’t simply hold the same beliefs or attend the same service or share the same interests — we have been united at the deepest level by the Spirit of God. Biblically speaking, our fellowship is not merely “socializing” — it is sharing together our common life in Christ." },
        { k: "q", ref: "J. I. Packer", t: "We should not think of our fellowship with other Christians as a spiritual luxury, an optional addition to the exercise of private devotions. Fellowship is one of the great words of the New Testament: it denotes something that is vital to a Christian’s spiritual health, and central to the Church’s true life." },
        { k: "p", t: "Because of the importance of relationships in the body of Christ — and our sinful tendencies to be independent, casual, or selfish in relating to others — we need to be intentional in pursuing them. Here are two key aspects of relationships that are genuinely biblical." },
        { k: "h", t: "Discipling" },
        { k: "p", t: "This word has many connotations, but by it we mean simply people helping each other understand and apply God’s word to their lives to become more like Christ." },
        { k: "p", t: "In the Great Commission (Matthew 28:18–20), the mandate of “making disciples” is characterized by “baptizing” — making converts through evangelism — and “teaching them to observe all that I have commanded you.” Within the church, the most fundamental way we do this is through relationships, fueled by the word of God, that encourage us, exhort us, and strengthen us in our walk with Christ (Ephesians 4:15–16; Colossians 3:16)." },
        { k: "h", t: "Caring" },
        { k: "p", t: "As “members one of another” (Romans 12:5), we have a responsibility to care for one another. The Bible describes our fellowship in concrete terms as actions we do with or for “one another.” Here is just a sampling:" },
        { k: "list", items: [
          "Love one another with brotherly affection (Romans 12:10)",
          "Outdo one another in showing honor (Romans 12:10)",
          "Live in harmony with one another (Romans 12:16)",
          "Comfort one another (2 Corinthians 13:11)",
          "Serve one another (Galatians 5:13)",
          "Bear with one another (Ephesians 4:2)",
          "Forgive one another (Ephesians 4:32)",
          "Worship God together (Ephesians 5:18–20)",
          "Pray for one another (Ephesians 6:18)",
          "Carry one another’s burdens (Galatians 6:2)",
          "Encourage one another (1 Thessalonians 5:11)",
          "Build one another up (1 Thessalonians 5:11)",
          "Confess our sins to one another (James 5:16)"
        ] },
        { k: "q", ref: "1 Corinthians 12:24–26", t: "But God has so composed the body, giving greater honor to the part that lacked it, that there may be no division in the body, but that the members may have the same care for one another. If one member suffers, all suffer together; if one member is honored, all rejoice together." },
        { k: "pull", t: "In short, we need each other." },
        { k: "p", t: "And so we must give ourselves to purposeful involvement in each other’s lives, for the strength of the body, the witness of the gospel, and the glory of God (Hebrews 10:24–25). “By this all people will know that you are my disciples, if you have love for one another” (John 13:35)." }
      ],
      check: {
        q: "How does the article define discipling?",
        options: [
          "A formal program run by the pastors",
          "People helping each other understand and apply God’s word to become more like Christ",
          "One-on-one Bible study for new converts only"
        ],
        answer: 1,
        why: "It happens mostly through ordinary relationships fueled by God’s word — not a program."
      },
      reflect: ["What has God given you that this church family would be glad to receive?"],
      discuss: "What has kept you from serving in the past — capacity, fear, or something else?"
    },
    {
      n: 9,
      title: "Faithfully Evangelistic",
      standfirst: "We desire to cultivate a church culture where every member understands and embraces the biblical responsibility and privilege of sharing the gospel.",
      mins: 2,
      url: "https://medium.com/@providencekc/faithfully-evangelistic-323a25216d15",
      passages: ["Acts 1:8", "1 Peter 3:15–16"],
      body: [
        { k: "p", t: "We desire to cultivate a church culture where every member understands and embraces the biblical responsibility and privilege of sharing the gospel with others." },
        { k: "q", ref: "Acts 1:8", t: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth." },
        { k: "q", ref: "1 Peter 3:15–16", t: "…but in your hearts regard Christ the Lord as holy, always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect…" },
        { k: "h", t: "The content of our evangelism: the gospel" },
        { k: "p", t: "We aren’t merely calling others to live a moral life, or asking them simply to “believe in God” or “go to church,” much less trying to convince them that Christians are “nice people.” Salvation comes only through faith in the finished work of Christ on our behalf. We want to equip every member to verbally share the good news of the gospel with others." },
        { k: "h", t: "The context of our evangelism" },
        { k: "p", t: "We encourage each of our members to bear witness to Jesus Christ and share the gospel in the network of relationships he provides for us, and in contexts where we have particular opportunity or for which we have a particular burden." },
        { k: "pull", t: "Perhaps the most powerful witness to the truth of the gospel: the community of our local church." },
        { k: "p", t: "The New Testament presents unity in the church body as a primary witness to the supernatural power of the gospel. Various contexts in the life of our church provide opportunities to introduce people to that witness." }
      ],
      check: {
        q: "What does the article name as one of the most powerful witnesses to the gospel?",
        options: [
          "A well-designed outreach event",
          "The unity and community of the local church",
          "A memorized gospel presentation"
        ],
        answer: 1,
        why: "The New Testament treats the church’s unity as evidence of the gospel’s supernatural power."
      },
      reflect: ["Who are two or three people you would love to see come to Christ?"],
      discuss: "Pray together, by name, for the people you each listed."
    },
    {
      n: 10,
      title: "Praying Together",
      standfirst: "We desire the life and ministry of our church — individually and corporately — to be dependent upon and fueled by prayer.",
      mins: 2,
      url: "https://medium.com/@providencekc/praying-together-b06dfed21563",
      passages: ["Matthew 6:5–13", "1 Thessalonians 5:17", "Acts 2:42", "Ephesians 3:14–19", "Colossians 4:2", "Matthew 9:37–38", "Colossians 4:3–4"],
      body: [
        { k: "p", t: "We desire the life and ministry of our church — individually and corporately — to be dependent upon and fueled by prayer." },
        { k: "h", t: "Prayer is at the heart of our existence" },
        { k: "p", t: "Prayer lies at the very heart of God’s eternal plan to have a people for himself — a people who know him and who are known by him. So prayer is not simply something Christians do; it’s an expression of who we are: children of a heavenly Father who live delighting in and depending upon him." },
        { k: "p", t: "Notice how Jesus assumes it in the Sermon on the Mount: “And when you pray… but when you pray… and when you pray…” (Matthew 6:5–7). Then: “Pray, then, like this: ‘Our Father in heaven…’” (Matthew 6:9). And Paul’s two words to the Thessalonians: “Pray without ceasing” (1 Thessalonians 5:17)." },
        { k: "h", t: "Prayer is at the heart of our ministry" },
        { k: "q", ref: "Acts 2:42", t: "And they devoted themselves to the apostles’ teaching and the fellowship, to the breaking of bread and the prayers." },
        { k: "q", ref: "Ephesians 3:14–19", t: "For this reason I bow my knees before the Father… that according to the riches of his glory he may grant you to be strengthened with power through his Spirit in your inner being, so that Christ may dwell in your hearts through faith — that you, being rooted and grounded in love, may have strength to comprehend… the love of Christ that surpasses knowledge." },
        { k: "p", t: "“Continue steadfastly in prayer, being watchful in it with thanksgiving” (Colossians 4:2)." },
        { k: "h", t: "Prayer is at the heart of our mission" },
        { k: "q", ref: "Matthew 9:37–38", t: "The harvest is plentiful, but the laborers are few; therefore pray earnestly to the Lord of the harvest to send out laborers into his harvest." },
        { k: "q", ref: "Colossians 4:3–4", t: "At the same time, pray also for us, that God may open to us a door for the word, to declare the mystery of Christ, on account of which I am in prison — that I may make it clear, which is how I ought to speak." }
      ],
      check: {
        q: "How does the article describe prayer?",
        options: [
          "A discipline reserved for the mature",
          "Not simply something Christians do, but an expression of who we are",
          "Chiefly a way to get our requests answered"
        ],
        answer: 1,
        why: "Prayer flows out of being children of a Father — delighting in him and depending on him."
      },
      reflect: ["What is your honest prayer life like in this season?"],
      discuss: "Set one small, keepable rhythm of prayer you could begin this week."
    },
    {
      n: 11,
      title: "Experiencing God’s Presence",
      standfirst: "A vibrant experience of the Holy Spirit is not meant to be the domain of a narrow brand of Christian; the Spirit is God’s empowering gift to all his people.",
      mins: 3,
      url: "https://medium.com/@providencekc/experiencing-gods-presence-f781bd41b630",
      passages: ["John 14:16–18", "1 Corinthians 14:1", "James 4:6–8", "Ephesians 5:18", "Acts 4:31", "1 Peter 4:10", "Hebrews 12:22–24"],
      body: [
        { k: "p", t: "A vibrant experience of the Holy Spirit is not meant to be the domain of a narrow brand of Christian; the Spirit is God’s empowering presence for the entirety of the life of the Christian and the church." },
        { k: "q", ref: "John 14:16–18", t: "And I will ask the Father, and he will give you another Helper, to be with you forever, even the Spirit of truth… You know him, for he dwells with you and will be in you. I will not leave you as orphans; I will come to you." },
        { k: "q", ref: "Gordon Fee", t: "The Spirit’s major role in Paul’s view of things lies with his being the absolutely essential constituent of the whole of Christian life, from beginning to end… The Spirit is therefore the empowering presence of God for living the life of God in the present." },
        { k: "h", t: "A posture, not just a doctrine" },
        { k: "p", t: "The Bible doesn’t just tell us things to believe about the Spirit — it exhorts us to a posture of heart concerning the Spirit’s work: “Pursue love, and earnestly desire the spiritual gifts” (1 Corinthians 14:1); “Draw near to God, and he will draw near to you” (James 4:6–8)." },
        { k: "p", t: "This posture has both personal and corporate implications. We experience the Spirit’s empowering work as we passionately seek God and dependently serve him." },
        { k: "h", t: "Pursue God’s active presence personally" },
        { k: "p", t: "Approach God daily with an attitude of dependence, gratefulness, and hunger. Recognize your need to be filled with the Holy Spirit on a daily basis (Ephesians 5:18; Acts 4:31)." },
        { k: "h", t: "Serve others diligently" },
        { k: "p", t: "“As each has received a gift, use it to serve one another, as good stewards of God’s varied grace” (1 Peter 4:10). The Spirit’s empowering work aims at our personal sanctification, mutual edification, and evangelistic witness. To pursue godliness, serve others, and share Christ with non-believers is to pursue the Spirit’s work in our lives." },
        { k: "h", t: "Expect to experience God’s presence when we gather" },
        { k: "p", t: "While individual believers have the privilege of experiencing God’s presence, this is especially true of the gathered church. The glorious reality of new covenant worship is worship in the presence of God." },
        { k: "q", ref: "Hebrews 12:22–24", t: "But you have come to Mount Zion and to the city of the living God, the heavenly Jerusalem, and to innumerable angels in festal gathering, and to the assembly of the firstborn who are enrolled in heaven… and to Jesus, the mediator of a new covenant." },
        { k: "p", t: "When we gather, we seek to experience his presence by:" },
        { k: "list", items: [
          "Attending to God as he addresses us through his word",
          "Responding to him in grateful adoration",
          "Seeking to love, serve, and encourage each other with our gifts"
        ] }
      ],
      check: {
        q: "According to this lesson, how do we pursue the Spirit’s work in our lives?",
        options: [
          "By waiting for unusual experiences",
          "By pursuing godliness, serving others, and sharing Christ",
          "By avoiding talk of the Spirit altogether"
        ],
        answer: 1,
        why: "The Spirit’s work aims at sanctification, mutual edification, and witness — so those pursuits *are* the pursuit of the Spirit."
      },
      reflect: ["What is your experience of the Holy Spirit — and what would you want to ask about it?"],
      discuss: "Where have you each seen God clearly at work in your life?"
    },
    {
      n: 12,
      title: "Partnering in the Broader Mission",
      standfirst: "While we have a specific mission as a church, we are also part of the Sovereign Grace family of churches.",
      mins: 1,
      url: "https://medium.com/@providencekc/partnering-in-the-broader-mission-f8891c190805",
      passages: [],
      body: [
        { k: "p", t: "While we have a specific mission as a church, we are also part of the Sovereign Grace family of churches. Sovereign Grace is a union of over 60 churches in the U.S., Mexico, Canada, and the U.K. We also have functional partnerships with churches in 15 other countries." },
        { k: "p", t: "As churches, we partner together and with Sovereign Grace Ministries in a number of ways:" },
        { k: "list", items: [
          "Church planting locally and internationally",
          "Pastoral training via the Sovereign Grace Pastors College",
          "Short-term missions",
          "Music materials for the local church",
          "Conferences"
        ] },
        { k: "p", t: "Although we’re still in our infancy as a church, we are grateful for the privilege we have to participate in a broader mission through Sovereign Grace. We look forward to exploring more ways in which we can directly contribute to the Great Commission as a local church." }
      ],
      check: {
        q: "What is Sovereign Grace?",
        options: [
          "A denomination Providence is considering joining",
          "A union of churches Providence belongs to, partnering in planting, training, and missions",
          "A publishing house for worship music only"
        ],
        answer: 1,
        why: "Providence is part of the Sovereign Grace family — over 60 churches partnering in church planting, pastoral training, missions, music, and conferences."
      },
      reflect: ["What questions do you have about our relationship to the wider family of churches?"],
      discuss: "Why might a local church want to be tied to churches beyond itself?"
    },
    {
      n: 13,
      title: "Polity at Providence",
      standfirst: "We have explored the beliefs and values that shape our life as a local church. But God intends for our doctrine and practice to emerge from an ordered life together.",
      mins: 3,
      url: "https://medium.com/@providencekc/the-commitments-we-make-to-each-other-57a8ff41eb23",
      passages: ["Acts 20:17–38", "1 Thessalonians 5:12–13", "1 Timothy 3:1–7", "Titus 1:5–9", "Hebrews 13:17", "1 Peter 5:1–5", "Jeremiah 31:31–34", "1 Peter 2:9", "Ephesians 1:3"],
      body: [
        { k: "p", t: "We have explored the beliefs and values that shape our life as a local church. But God intends for our doctrine and practice to emerge from within a church framework that is consistent with Scripture’s teaching. In other words, our beliefs about God (theology) shape the way we think about our local church (ecclesiology). The local church by necessity involves structures, roles, and responsibilities designed to display God’s glory and strengthen every member." },
        { k: "p", t: "The Bible is not ambiguous about the shape and function of the church. A healthy local church gives careful consideration to the Bible’s teaching to determine how it is governed, why it gathers, and what the relationships and responsibilities of members are to one another." },
        { k: "h", t: "An elder-governed church" },
        { k: "p", t: "It is our view that Scripture teaches that elders are to lead, direct and manage the affairs of the church, and that such leadership and care are a God-given means of grace to the church (Romans 12:8; Acts 20:17–38; 1 Thessalonians 5:12–13; 1 Timothy 3:1–7; 5:17; Titus 1:7–9; Hebrews 13:17; 1 Peter 5:1–5)." },
        { k: "p", t: "Elders are to be chosen for ministry by elders and must meet the clear requirements found in Scripture (1 Timothy 3:1–7; Titus 1:5–9). A wise eldership will seek the affirmation of the congregation regarding the fitness of future elders." },
        { k: "h", t: "Vitally involved members" },
        { k: "p", t: "While the elders bear the responsibility to lead, generally speaking there is no fundamental distinction among believers in Christ’s body. Under the new covenant, there is no mediating class of leaders between God and his people (Jeremiah 31:31–34). All Christians — elder and congregation alike — have equal access to God through Christ, are “priests” of God (1 Peter 2:9), possess the Holy Spirit and spiritual gifts, receive illumination from the Spirit, and share all other spiritual blessings in Christ (Ephesians 1:3ff.)." },
        { k: "pull", t: "The health of the local church depends upon all its members, whether they are in leadership or not." },
        { k: "p", t: "The members’ faithful participation, willing submission, mutual love, godly example, and ongoing exercise of spiritual gifts and wise counsel provide strength and stability in a local church." },
        { k: "h", t: "Our broader partnership" },
        { k: "p", t: "While our church’s governance preserves the integrity of the local church, we recognize that a healthy church is not isolated from accountability, nor is it self-sufficient to carry out the Great Commission. We believe that an interdependence with like-minded churches is the biblically prescribed means for fulfilling the Great Commission. Such cooperation is necessary for the protection of doctrinal fidelity and standards of holiness, the direction of a common mission, and the disposal of common funds. Therefore, from our inception we have been joined together in formal partnership with the churches of Sovereign Grace." },
        { k: "p", t: "A global mission. Sovereign Grace churches partner together and, through a ministry arm, aim to care for pastors, strengthen believers, and help grow strong churches — church planting locally and internationally, pastoral training via the Sovereign Grace Pastors College, short-term missions, music materials for the local church, and conferences." },
        { k: "p", t: "A doctrinal unity. Each of the Sovereign Grace churches subscribes to the Sovereign Grace Ministries Statement of Faith. The doctrinal emphases we hold are shared by all Sovereign Grace churches." },
        { k: "p", t: "An extra-local accountability. While we are not congregational, we do not believe that the authority a local eldership exercises over its congregation is absolute, without further appeal or recourse. Therefore the elders of local churches are accountable for their life and doctrine, not only to their own local congregations, but also in part to the broader body of elders in Sovereign Grace." },
        { k: "p", t: "Our extra-local accountability is primarily expressed in partnership with a regional group of Sovereign Grace churches in our geographic area. Together, we cooperate on mission strategy, mutual care, and accountability. Specifically, a group of elders drawn from the churches in our region approve church plants, handle any necessary judicial functions, and participate with local elders in the ordination process." },
        { k: "p", t: "Broader partnership and accountability is expressed through the entire body of Sovereign Grace churches. Each church appoints one or two elders to serve on a national council of elders. This representative group handles issues of national significance for our churches, such as proposed amendments to the Statement of Faith or Book of Church Order, or nominations to the Sovereign Grace Leadership Team." }
      ],
      check: {
        q: "Are the elders of Providence accountable to anyone outside the local church?",
        options: [
          "No — a local eldership’s authority is final",
          "Yes — in part to the broader body of elders in Sovereign Grace, regionally and nationally",
          "Only to a denominational headquarters"
        ],
        answer: 1,
        why: "Providence is elder-governed but not isolated: regional and national bodies of elders provide real accountability and recourse."
      },
      reflect: ["What does it mean to you to place yourself under the care of pastors?"],
      discuss: "What good — and what harm — have you seen from church leadership?"
    },
    {
      n: 14,
      title: "The Role and Responsibilities of a Pastor",
      standfirst: "In the early stages of the church, leaders recognized the importance of maintaining Biblical priorities in their labors (see Acts 6:1–4).",
      mins: 6,
      url: "https://medium.com/@providencekc/the-role-and-responsibilities-of-a-pastor-9f6b4017fd0d",
      passages: ["Acts 6:1–4", "1 Timothy 5:17", "1 Peter 5:1–3", "Romans 12:6–8", "1 Timothy 4:6", "2 Timothy 4:1–2", "Ephesians 4:11–12", "2 Timothy 2:2", "Acts 20:28–31", "Matthew 18:15–17", "Mark 10:43–45", "1 Timothy 4:12"],
      body: [
        { k: "p", t: "In the early stages of the church, leaders recognized the importance of maintaining biblical priorities in their labors (see Acts 6:1–4). The Scriptures outline what the job description of a pastor should be." },
        { k: "h", t: "Lead the church" },
        { k: "p", t: "According to Scripture, elders are called by God and accountable to God to lead the local church. The Bible describes this in various ways: elders who “rule well” are worthy of double honor (1 Timothy 5:17); pastors shepherd the flock, “exercising oversight” (1 Peter 5:2); “the one who leads, with zeal” (Romans 12:8)." },
        { k: "h", t: "Nourish the church" },
        { k: "p", t: "God has ordained his word as the primary instrument for the strengthening of his church, and he charges pastors with the task of feeding the church with his word. Indeed, the health and future of the church depends upon its leaders faithfully transmitting sound doctrine and biblical practice to others (1 Timothy 4:6)." },
        { k: "q", ref: "2 Timothy 4:1–2", t: "I charge you in the presence of God and of Christ Jesus, who is to judge the living and the dead, and by his appearing and his kingdom: preach the word; be ready in season and out of season; reprove, rebuke, and exhort, with complete patience and teaching." },
        { k: "h", t: "Equip the church" },
        { k: "p", t: "The pastor is to be an equipper, training the church so that each member may be positioned for maximum fruitfulness in his or her life. One sign of effective pastoral ministry is the extent to which people are equipped to then serve others." },
        { k: "pull", t: "In a healthy local church, leaders train — people minister." },
        { k: "p", t: "“And he gave the apostles, the prophets, the evangelists, the pastors and teachers, to equip the saints for the work of ministry” (Ephesians 4:11–12); “what you have heard from me in the presence of many witnesses entrust to faithful men who will be able to teach others also” (2 Timothy 2:2)." },
        { k: "h", t: "Shepherd the church" },
        { k: "p", t: "As shepherds of God’s people, pastors are called to protect the church from the dangers it faces, such as false teaching, the allurements of the world, and the ravaging effects of sin. Pastors protect the church by teaching sound doctrine, by discerning errors and temptations offered by the culture, and by modeling, encouraging, and protecting biblical standards of godliness — which includes, when necessary, administering church discipline in a biblical and redemptive manner (Acts 20:28–31; Matthew 18:15–17)." },
        { k: "q", ref: "John MacArthur", t: "A shepherd’s oversight of the flock expresses itself broadly in two ways. First, the shepherds provide truthful, positive direction and leadership to the flock. Second, they watch for spiritual dangers such as sin, false teaching, and false teachers." },
        { k: "q", ref: "John Piper", t: "Pastoral care is the loving concern of Christ for his flock which he shows them by providing under-shepherds whose duty it is to equip the saints to minister care to each other." },
        { k: "h", t: "Serve the church" },
        { k: "p", t: "Although pastors are responsible to lead the church, they are to do so as servants. Following the example of Jesus who “came not to be served but to serve” (Mark 10:45), leaders are to posture themselves as servants and expend themselves for the glory of God and the good of others — “not domineering over those in your charge, but being examples to the flock” (1 Peter 5:2–3)." },
        { k: "h", t: "Be an example to the church" },
        { k: "p", t: "Pastors are, of course, sinners and sheep, just like every other member of the church. However, pastors are called to be an example to the flock — not a sinless example or a perfect example, but a faithful one (1 Peter 5:1–3; 1 Timothy 4:12)." }
      ],
      check: {
        q: "What does “equipping” mean for a pastor’s work?",
        options: [
          "Doing the ministry so members don’t have to",
          "Training members so they can minister to others",
          "Managing the church’s programs and budget"
        ],
        answer: 1,
        why: "Leaders train, people minister — pastors equip the saints for the work of ministry."
      },
      reflect: ["What do you most need from a pastor in this season of your life?"],
      discuss: "How can you pray for the pastors of this church?"
    },
    {
      n: 15,
      title: "The Role and Responsibilities of Members",
      standfirst: "The New Testament is clear that each Christian is allotted by God to a specific local church and its eldership (1 Pet. 5:2–3).",
      mins: 6,
      url: "https://medium.com/@providencekc/the-role-and-responsibilities-of-members-b5372b9a6c96",
      passages: ["1 Peter 5:2–3", "Jude 20–21", "John 15:5", "John 13:34–35", "Hebrews 10:23–25", "Acts 2:42", "Acts 4:34–35", "1 Corinthians 9:13–14", "Philippians 4:15–16", "2 Corinthians 9:6–7", "Hebrews 13:17", "Ephesians 6:18–19", "1 Thessalonians 5:12–13", "Ephesians 4:29–32", "Ephesians 5:3–8"],
      body: [
        { k: "p", t: "The New Testament is clear that each Christian is allotted by God to a specific local church and its eldership (1 Peter 5:2–3). This divine assignment is designed to produce a community that brings glory to God and a powerful gospel-witness to the world. The Bible holds out particular responsibilities for Christians which, when fulfilled, strengthen the church’s health and witness." },
        { k: "p", t: "Therefore as Providence Community Church, there are certain expectations of members, which are simply expressions of a biblical commitment to a particular local church. We expect that any member who is pursuing their relationship with God and believes that God has called them to this church will faithfully fulfill these priorities." },
        { k: "h", t: "Give attention to your relationship with God" },
        { k: "p", t: "The Bible describes our relationship with God as a communion made possible by the substitutionary sacrifice of our Savior, Jesus. Through God’s justifying and adopting grace, we are declared righteous before God as his sons and daughters. Therefore, we have the daily privilege, whether privately or corporately, to commune with our Father and experience the power and comfort of his Spirit through the word and prayer. As we abide in the love of God, walking in the grace of the gospel and obedience to his word, our faith is strengthened and we’re promised a life of fruitfulness (Jude 20–21; John 15:5)." },
        { k: "h", t: "Cultivate love for the members of your local church" },
        { k: "q", ref: "John 13:34–35", t: "A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another. By this all people will know that you are my disciples, if you have love for one another." },
        { k: "p", t: "Jesus could have said, they will know we are Christians by how we love the world. But he didn’t. Instead he drew, in effect, a circle around the disciples and said, “By the love you show one another, the world will know that you belong to me.” As a local church demonstrates Christ-like love amongst its members, a compelling evangelistic witness emerges. Love that celebrates another’s joy and grieves another’s suffering, and is marked by holiness, faithfulness, forgiveness and encouragement, “adorns the gospel” — shining brightly in a world committed to self-love." },
        { k: "h", t: "Faithfully participate in the Sunday meetings" },
        { k: "q", ref: "Hebrews 10:23–25", t: "Let us hold fast the confession of our hope without wavering, for he who promised is faithful. And let us consider how to stir up one another to love and good works, not neglecting to meet together, as is the habit of some, but encouraging one another, and all the more as you see the Day drawing near." },
        { k: "p", t: "The life of the church isn’t limited to a meeting, but there’s no more significant aspect of our life together than our gatherings on Sundays. It is in this weekly context that the church body comes together to encourage each other as we:" },
        { k: "list", items: [
          "Hear the word read and preached",
          "Declare our dependence and trust in God through prayer",
          "Sing the truths of God’s word in response to his grace",
          "Participate in the sacraments",
          "Edify one another through the gifts of the Spirit",
          "Contribute to the ministry of the church"
        ] },
        { k: "p", t: "This is the pattern we see throughout the New Testament: “And they devoted themselves to the apostles’ teaching and fellowship, to the breaking of bread and the prayers” (Acts 2:42)." },
        { k: "h", t: "Support the church financially" },
        { k: "p", t: "Stewardship involves the faithful use of resources that belong to another. All that we have comes from God, and an authentic relationship with Christ will find expression in the faithful use of our resources for his purposes and the needs of others." },
        { k: "p", t: "The substance of stewardship. Throughout salvation history, God has called his people to support his work through giving. In the Old Testament, God’s people were to give a tithe, or the first tenth, of their income to God. This practice predated the giving of the Law (Genesis 14:20; 28:22), and was later formalized in the Law of Moses for the maintenance of the temple and provision for the priests and Levites who served there." },
        { k: "p", t: "The Old Testament practice of tithing embodies many principles carried forth into the New Testament: consistent giving, giving to support the worship and mission of God’s people, giving to support those called to minister to God’s people, and giving to care for the oppressed. In the New Testament, what it means to obey God’s law is broadened and intensified due to the transforming work of the Spirit in light of Christ’s work on the cross. In the same way, our consistent giving is not merely to be thought of as “paying our dues,” but should flow from the giving of our entire selves to God. It is a reminder of God’s ownership of us." },
        { k: "p", t: "The work of stewardship. Giving to support the work of the church remains an expectation of believers — supporting individuals in need (Acts 4:34–35), supporting the church’s leaders so they can devote their time and energies to serving the church (1 Corinthians 9:13–14), and supporting the extension of the gospel (Philippians 4:15–16)." },
        { k: "p", t: "The practice of tithing embodies important biblical guidelines and provides a helpful starting point for regular giving to the church. Believers are commanded to financially support the local church where they receive care and training. We desire the members of the church to rejoice in the privilege of sharing in God’s work here at Providence." },
        { k: "p", t: "The heart of stewardship. What we actually do with our money reveals where our heart truly is (Matthew 6:21). In addition to commands to give, Scripture also addresses our motives and attitudes:" },
        { k: "list", items: [
          "Giving is to be generous, not stingy (2 Corinthians 9:6)",
          "Giving is to be enthusiastic, not grudging (2 Corinthians 9:7)",
          "Giving is to be deliberate, not haphazard (2 Corinthians 9:7; Acts 11:29)",
          "Giving is to be discreet, not showy (Matthew 6:1–4)",
          "Giving is to be with faith, not anxiety (Malachi 3:10)"
        ] },
        { k: "h", t: "Follow the church’s pastoral leadership" },
        { k: "p", t: "To our individualistic culture, the Bible’s commands concerning leaders might seem antiquated or authoritarian. Neither is the case. And, as with all the Bible’s commands, proper understanding and faith-filled obedience will result in blessing for ourselves and for the church as a whole." },
        { k: "q", ref: "Hebrews 13:17", t: "Obey your leaders and submit to them, for they keep watch over your souls as those who will give an account. Let them do this with joy and not with grief, for this would be unprofitable for you." },
        { k: "pull", t: "Submission does not mean passivity or blind obedience." },
        { k: "p", t: "Fundamentally, submission is an attitude: a disposition to affirm and support the leadership of the church, and to increase its effectiveness through joyful and faith-filled participation. Rather, submission is an expression of faith towards God — that he has appointed leaders for us and he will use them for our good. It recognizes the critical role that leadership plays in bringing about God’s purposes in the church and in the lives of believers." },
        { k: "p", t: "A ministry of prayer for your pastors and church. Pastors view their ministry as a profound privilege but are very aware of their need for God’s grace. Your pastors are “jars of clay” who are familiar with weakness and temptation, and yet are called to provide wise leadership, sound teaching and pastoral care that can only come from God. We join with Paul and appeal that you pray for all the saints of this church and specifically for the pastors (Ephesians 6:18–19)." },
        { k: "p", t: "A God-honoring appreciation. The biblical concept of honor exhorts us to recognize God’s provision through another person, to cultivate gratitude for this provision, and rightfully to appreciate and acknowledge those who have served and benefited us (1 Thessalonians 5:12–13). In so doing, we are actually giving glory to God for his goodness to us through other people. An unfortunate confusion exists between exalting leaders and honoring leaders in the body of Christ. Exalting leaders is idolatry and is totally unacceptable. Honoring leaders, however, is biblical and should be the regular attitude and practice of every Christian." },
        { k: "h", t: "Pursue God-honoring relationships" },
        { k: "p", t: "God’s word charges us to “be imitators of God as beloved children” (Ephesians 5:1). So we want to reflect his holiness in our lives, personally and corporately, in our speech and conduct (Ephesians 4:29–32; 5:3–8)." },
        { k: "h", t: "Participate in evangelistic and discipling relationships" },
        { k: "p", t: "The structures of fellowship within our church are both formal and informal. They are designed to help facilitate mature care and discipling relationships between members." }
      ],
      check: {
        q: "How does the article define submission to pastoral leadership?",
        options: [
          "Passive, unquestioning obedience",
          "A disposition to affirm and support the church’s leadership through joyful, faith-filled participation",
          "Agreement with every decision the elders make"
        ],
        answer: 1,
        why: "It is an attitude of faith toward God, not passivity or blind obedience."
      },
      reflect: ["Which of these responsibilities would come naturally to you? Which would stretch you?"],
      discuss: "Is there anything here you could not honestly commit to right now?"
    },
    {
      n: 16,
      title: "The Church Covenant",
      standfirst: "Just as a statement of faith summarizes what we believe the Bible teaches, a church’s covenant gives expression to how we commit to live together.",
      mins: 3,
      url: "https://medium.com/@providencekc/the-church-covenant-9094fdf75cad",
      passages: [],
      body: [
        { k: "p", t: "Just as a statement of faith summarizes what we believe the Bible teaches, a church’s covenant gives expression to how we commit to live together." },
        { k: "p", t: "In a world that embraces individualism and expresses suspicion about authority and commitment and holiness, the grace of God shines brightly through Christians who gladly bind themselves to God and other believers in the context of the local church." },
        { k: "p", t: "This document will function as a commitment between each of us as members. It is a statement that we agree to be held accountable by this particular body of believers, this local representation of Christ’s church. Likewise, we agree to hold others in the church accountable. To hold accountable simply means to “take responsibility for.”" },
        { k: "pull", t: "A church covenant void of this responsibility is a worthless document." },
        { k: "p", t: "The love we have for one another shows the world we are disciples of Jesus Christ. This covenant reminds us, pushes us, calls us to live out by grace that which we believe by grace. We both want to know (our statement of faith) and do (church covenant)." },
        { k: "h", t: "The covenant" },
        { k: "p", t: "The following is the church covenant which we ask all new members to agree to uphold." },
        { k: "list", items: [
          "I will worship the Lord, both privately and corporately, by rejoicing in his grace and giving thanks to the Father for the sacrifice of his Son, Jesus, and for the benefits that sacrifice purchased — especially forgiveness of sins and eternal life — and for the gift of the Holy Spirit who empowers us to believe and live a life that glorifies God.",
          "I will devote myself to the study of Scripture and to prayer both privately and in group contexts. I will submit to the authority of the Scriptures as the final arbiter on all issues.",
          "I will devote myself to growth in the grace and knowledge of our Lord and Savior, Jesus Christ, through seeking to become more Christ-like as I apply the Scriptures to my life.",
          "I will live together with my brothers and sisters in love and will seek only their good by establishing relationships that promote holiness and discipleship.",
          "I will be vigilant to guard the welfare and joy of my brothers and sisters, admonishing anyone whose practice of sin requires it. And I will humbly receive admonishment from my brothers and sisters when my sin requires it.",
          "I will extend the grace of forgiveness to others, just as the Lord has forgiven me.",
          "I will support the church’s doctrine and practice of church discipline.",
          "I will care for my brothers and sisters in Christ as needs arise. And I will strive to use my spiritual gift(s) for the building up of Providence Community Church.",
          "I will be diligent to preserve the unity of the church. Therefore, I will support the statement of faith of Providence Community Church and not be divisive. I will affirm the leadership that God has appointed. And I will reject all opportunities to hear or speak gossip and slander.",
          "I will serve the church’s ministries and mission by regularly and sacrificially and cheerfully giving of my time, gifts, and money.",
          "I will seek to spread the glory of God by proclaiming the gospel, both in word and deed, to those within my sphere of influence who do not yet believe.",
          "I will actively seek regular biblical fellowship with my brothers and sisters, not neglecting to meet together with them in corporate worship and in care groups.",
          "I will, if I move from this place, unite with some other church where I can carry out the spirit of this agreement and follow the teaching of God’s word."
        ] }
      ],
      check: {
        q: "What does the covenant say about accountability?",
        options: [
          "Members agree to be held accountable, and to hold others accountable",
          "Only the elders hold members accountable",
          "Accountability is optional for those who prefer privacy"
        ],
        answer: 0,
        why: "It runs both ways — and a covenant without that responsibility is, in the article’s words, a worthless document."
      },
      reflect: ["Read the covenant slowly. Which line will cost you the most to keep?"],
      discuss: "Read the covenant aloud together, one line each."
    },
    {
      n: 17,
      title: "Church Discipline",
      standfirst: "And let us consider how we may spur one another on toward love and good deeds (Heb. 10:24).",
      mins: 8,
      url: "https://medium.com/@providencekc/church-discipline-680f6f123bae",
      passages: ["Hebrews 10:24–25", "Ephesians 5:25–27", "Hebrews 12:6", "Psalm 94:12", "Revelation 3:19", "Matthew 18:12–17", "Galatians 6:1", "1 Corinthians 5:1–13", "2 Timothy 1:7", "Titus 1:8", "James 3:1", "1 Timothy 5:19–20", "Hebrews 12:10–11"],
      body: [
        { k: "q", ref: "Hebrews 10:24", t: "And let us consider how we may spur one another on toward love and good deeds." },
        { k: "h", t: "Accountability and discipline are signs of God’s love" },
        { k: "p", t: "God has established the church to reflect his character, wisdom and glory in the midst of a fallen world (Ephesians 3:10–11). He loves his church so much that he sent his Son to die for her (Ephesians 5:25). His ultimate purpose for his church is to present her as a gift to his Son; thus Scripture refers to the church as the “bride” of Christ (Revelation 19:7). For this reason the Father, Son and Holy Spirit are continually working to purify the church and bring her to maturity (Ephesians 5:25–27)." },
        { k: "p", t: "This does not mean that God expects the church to be made up of perfectly pure people. He knows that the best of churches are still companies of sinners, saved by grace, who wrestle daily with remaining sin (1 John 1:8; Philippians 3:12). Therefore, it would be unbiblical for us to expect church members to live perfectly. What we can do, however, is confess our common struggle with sin and our mutual need for God’s mercy and grace. We also can spur one another on toward maturity by encouraging and holding each other accountable to love, seek after, and obey God with all of our hearts, souls, minds and strength, and to love others as we love ourselves (Mark 12:30–31; Hebrews 10:24–25)." },
        { k: "pull", t: "The Bible never presents church discipline as being negative, legalistic or harsh, as modern society does." },
        { k: "p", t: "The Bible sometimes refers to this process of mutual encouragement and accountability as “discipline.” True discipline originates from God himself and is always presented as a sign of genuine love. “The Lord disciplines those he loves” (Hebrews 12:6). “Blessed is the man you discipline, O LORD” (Psalm 94:12). “Those whom I love I rebuke and discipline” (Revelation 3:19)." },
        { k: "p", t: "God’s discipline in the church, like the discipline in a good family, is intended to be primarily positive, instructive and encouraging. It is a biblical means of facilitating growth, change, fruitfulness, and where needed, restoration. This process, which is sometimes referred to as “formative discipline,” involves preaching, teaching, prayer, personal Bible study, small group fellowship and countless other enjoyable activities that challenge and encourage us to love and serve God more wholeheartedly." },
        { k: "p", t: "On occasion God’s discipline, like the discipline in a family with growing children, also may have a corrective purpose. When we forget or disobey what God has taught us, he corrects us. One way he does this is to call the church to seek after us and lead us back into obedience and faith. This process, sometimes called “corrective” or “restorative” discipline, is likened in Scripture to a shepherd seeking after a lost sheep." },
        { k: "q", ref: "Matthew 18:12–13", t: "If a man has a hundred sheep, and one of them wanders away, will he not leave the ninety-nine on the hills and go to look for the one that wandered off? And if he finds it, I tell you the truth, he is happier about that one sheep than about the ninety-nine that did not wander off." },
        { k: "p", t: "Thus, restorative or corrective discipline is never to be done in a harsh, vengeful or self-righteous manner. It is always to be carried out in humility and love, with the goals of restoring someone to a close walk with Christ (Matthew 18:15; Galatians 6:1), protecting others from harm (1 Corinthians 5:6), and showing respect for the honor and glory of God’s name (1 Peter 2:12)." },
        { k: "p", t: "Biblical discipline is similar to the discipline we value in other aspects of life. We value music teachers who bring out the best in their students by teaching them proper technique and correcting their errors so they can play a piece properly. We applaud athletic coaches who diligently teach their players to do what is right and correct them when they fumble. And we admire parents who consistently teach their children how to behave properly and lovingly discipline them when they disobey. The same principles apply to the family of God." },
        { k: "p", t: "The leaders of our church recognize that God has called them to an even higher level of accountability regarding their faith and conduct (James 3:1; 1 Timothy 5:19–20). Therefore, they are committed to listening humbly to loving correction from each other or from any member in our church, and, if necessary, to submitting themselves to the corrective discipline of our body." },
        { k: "h", t: "Most corrective discipline is private, personal and informal" },
        { k: "p", t: "God gives every believer grace to be self-disciplined (2 Timothy 1:7). Thus discipline always begins as a personal matter and usually remains that way, as each of us studies God’s word, seeks him in prayer, and draws on his grace to identify and change sinful habits and grow in godliness." },
        { k: "p", t: "But sometimes we are blind to our sins or so tangled in them that we cannot get free on our own. This is why the Bible says, “Brothers, if someone is caught in a sin, you who are spiritual should restore him gently” (Galatians 6:1). In obedience to this command, we are committed to giving and receiving loving correction within our church whenever a sin — whether in word, behavior or doctrine — seems too serious to overlook (Proverbs 19:11)." },
        { k: "p", t: "If repeated private conversations do not lead another person to repentance, Jesus commands that we ask other brothers or sisters to get involved: “If he will not listen, take one or two others along” (Matthew 18:16). If informal conversations with these people fail to resolve the matter, then we may seek the involvement of more influential people, such as a pastor. If even these efforts fail, and if the issue is too serious to overlook, we will move into what may be called “formal discipline.”" },
        { k: "h", t: "Formal discipline may involve the entire church" },
        { k: "p", t: "If an individual persistently refuses to listen to personal and informal correction to turn from speech or behavior that the Bible defines as sin, Jesus commands us to “tell it to the church” (Matthew 18:17). This first involves informing one or more church leaders about the situation. If the offense is not likely to cause imminent harm to others, our leaders may approach the individual privately to personally establish the facts and encourage repentance of any sin they discover. The individual will be given every reasonable opportunity to explain and defend his or her actions. If the individual recognizes his sin and repents, the matter usually ends there." },
        { k: "p", t: "If an offense is likely to harm others or lead them into sin, or cause division or disruption, our leaders may accelerate the entire disciplinary process and move promptly to protect the church (Romans 16:17; 1 Corinthians 5:1–13; Titus 3:10–11)." },
        { k: "p", t: "As the disciplinary process progresses, our leaders may impose a variety of sanctions to encourage repentance, including but not limited to private and public admonition, withholding the Lord’s Supper, removal from ministry responsibility, withdrawal of normal fellowship, and, as a last resort, removal from membership." },
        { k: "p", t: "If the straying individual does not repent in response to private appeals from our leaders, they may inform others in the church who may be able to influence that individual or be willing to pray for him or her, or people who might be harmed or affected by that person’s behavior. This step may include close friends, a small group, or the entire congregation if our leaders deem it to be appropriate." },
        { k: "p", t: "If, after a reasonable period of time, the individual still refuses to change, then our leaders may, with the congregation’s knowledge, formally remove him or her from membership and its privileges, in particular the Lord’s Supper. At this point the church is instructed by God’s word to no longer treat him as a fellow Christian but as an unbeliever (Matthew 18:17). This means we will look for opportunities to lovingly bring the gospel to him, remind him of God’s holiness and mercy, and call him to repent and put his faith in Christ." },
        { k: "p", t: "We realize that our natural human response to correction often is to hide or run away from accountability (Genesis 3:8–10). To avoid falling into this age-old trap and to strengthen our church’s ability to rescue us if we are caught in sin, we agree not to run away from membership or accountability if discipline is pending against us. Although we are free to join ourselves to another local church where the gospel is preached, we agree that a withdrawal while discipline is pending will not go into effect until the church has fulfilled its God-given responsibilities to encourage our repentance and restoration, and to bring the disciplinary process to an orderly conclusion." },
        { k: "p", t: "If an individual leaves the church while discipline is in effect or is being considered, and our leaders learn that he or she is attending another church, they will inform that church of the situation and ask its leaders to encourage the individual to repent and be reconciled to the Lord and to any people he or she has offended. This action is intended both to help the individual find freedom from his sin and to warn the other church about the harm that he or she might do to their members." },
        { k: "pull", t: "Loving restoration always stands at the heart of the disciplinary process." },
        { k: "p", t: "If an individual repents, and our leaders confirm his or her sincerity, we will rejoice together as a church and gladly imitate God’s forgiveness by restoring the person to fellowship within the body (Matthew 18:13; Luke 15; 2 Corinthians 2:5–11; Colossians 3:12–14)." },
        { k: "p", t: "People who have been excluded from membership in another church will not be allowed to partake of the sacraments in our church, to become members, or to participate in the regular fellowship of our church until they have repented of their sins and made a reasonable effort to be reconciled, or our leaders have determined that the discipline of the former church was not biblically appropriate." },
        { k: "q", ref: "Hebrews 12:10–11", t: "God disciplines us for our good, that we may share in his holiness. No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it." }
      ],
      check: {
        q: "Where does corrective discipline normally begin?",
        options: [
          "With an announcement to the whole congregation",
          "With the elders",
          "Privately and personally, between individuals"
        ],
        answer: 2,
        why: "Most discipline is private and informal; involving others — and finally the church — is a later step, and always aimed at restoration."
      },
      reflect: ["What feelings does the phrase “church discipline” stir up in you?"],
      discuss: "How would you want to be approached if you were drifting?"
    },
    {
      n: 18,
      title: "Statement on Divorce & Remarriage",
      standfirst: "Marriage is a gift from God, designed to bring him glory and reflect the gospel. God intended marriage to be a lifelong covenant.",
      mins: 2,
      url: "https://medium.com/@providencekc/statement-on-divorce-remarriage-cedaabf2e5bb",
      passages: ["Matthew 19:3–9", "1 Corinthians 7:10–16"],
      body: [
        { k: "p", t: "Marriage is a gift from God, designed to bring him glory and reflect the gospel. God intended marriage to be a lifelong covenant relationship between a man and a woman. Divorce is a sad fact in our society and in the church at large. While God has, from the beginning, intended that marriage be lifelong and glorify God by reflecting the relationship of Christ and his church, there are times when our Lord permits a believer to seek a divorce without sinning against God or a spouse." },
        { k: "p", t: "We believe the only two conditions under which the Bible allows this are:" },
        { k: "list", items: [
          "When a spouse commits sins that involve sexual contact with another person",
          "When an unbelieving spouse abandons a marriage"
        ] },
        { k: "pull", t: "It is important to note that God permits divorce in such cases. Divorce is not required." },
        { k: "p", t: "Nor will the church encourage a spouse to divorce when he or she has faith for the marriage to be restored — even when the situations listed above exist." },
        { k: "p", t: "For the church to condone a divorce in these cases, the spouse must submit the facts of his or her marital situation to the pastors to determine before God in Scripture what he would permit. If a spouse who is a member of the church should seek a divorce from another member due to abandonment, he or she must first wait for the church to follow its practice of church discipline to the end. A conclusion that the sinning spouse is to be treated as an unbeliever must occur before divorce may become an option." },
        { k: "p", t: "Separated spouses awaiting a pending divorce should consider themselves married until the day a civil court declares the divorce final and legally recognized. They should conduct themselves in the church as married persons." },
        { k: "p", t: "If a divorced person becomes a member of the church, he or she must understand that remarriage will only be condoned by the church when the circumstances surrounding the divorce fall under the conditions listed above. If circumstances of the divorce do not conform to what Scripture deems acceptable, the divorced person should consider before God whether he or she should seek reconciliation with their former spouse. He or she should seek to confess to God and to his or her former spouse any sins committed in the seeking of the divorce that did not comply with the teaching of Scripture." }
      ],
      check: {
        q: "What does the statement say about the two permitted grounds for divorce?",
        options: [
          "They require divorce once the conditions are met",
          "God permits divorce in those cases; it is never required, and reconciliation is welcomed",
          "They apply only to members who consult a lawyer first"
        ],
        answer: 1,
        why: "Permission is not obligation — the church will not urge divorce where there is faith for the marriage to be restored."
      },
      reflect: ["Is there anything in your own story a pastor should know as you read this?"],
      discuss: "How has divorce touched your family or your circle of friends?"
    },
    {
      n: 19,
      title: "Our Commitment to Biblical Counseling",
      standfirst: "I myself am convinced, my brothers, that you yourselves are full of goodness, complete in knowledge and competent to instruct one another.",
      mins: 3,
      url: "https://medium.com/@providencekc/our-commitment-to-biblical-counseling-62de5f208abe",
      passages: ["Romans 15:14", "Proverbs 11:14", "Galatians 6:1–2", "Hebrews 13:17", "James 5:16", "2 Timothy 3:16–17", "1 Timothy 4:12", "Proverbs 11:13", "Matthew 18:15–20"],
      body: [
        { k: "q", ref: "Romans 15:14", t: "I myself am convinced, my brothers, that you yourselves are full of goodness, complete in knowledge and competent to instruct one another." },
        { k: "p", t: "All Christians struggle with situations that go beyond personal wisdom or ability. This can include life decisions, serious choices, significant trials, or sin and the effect it has on our lives and our relationships. Whenever believers are faced with such decisions or challenges, or are unable to overcome sinful attitudes or behaviors through personal efforts, God’s word calls them to seek assistance from other believers, and when needed from church leaders, who have the responsibility of providing pastoral counseling and oversight (Proverbs 11:14; 15:22; Romans 15:14; Galatians 6:1–2; 2 Timothy 4:1–2; Hebrews 13:17; James 5:16)." },
        { k: "p", t: "Therefore, this church encourages its members to involve others, including our pastors, in such circumstances: seeking counsel, soliciting prayer, pursuing wisdom, confessing sin." },
        { k: "p", t: "We believe that the Bible provides thorough guidance and instruction for faith and life (2 Timothy 3:16–17). Therefore, our counseling is based on scriptural principles rather than those of secular psychology or psychiatry. Unless they specifically state otherwise, none of those who counsel in this church are trained or licensed as psychotherapists or mental health professionals, nor should they be expected to follow the methods of such specialists." },
        { k: "p", t: "God calls our pastors, leaders and lay-counselors to set an example for us “in speech, in life, in love, and in faith and purity” (1 Timothy 4:12). Therefore, we expect them to treat counselees with every respect and courtesy, and to avoid even the appearance of impropriety or impurity during counseling (Ephesians 5:3). We also expect counselees to promptly report to the pastoral team any conduct that fails to meet this standard." },
        { k: "p", t: "To prevent our leaders from being placed in situations that might compromise their pastoral commitments, we, the members and attenders of this church, agree that we will not try to compel them to testify in any legal proceeding or otherwise divulge any confidential information they receive through pastoral counseling or ministry (Proverbs 11:13; 25:9)." },
        { k: "p", t: "There are occasions when our leaders do not have sufficient time to meet with every person who asks for counseling. At such times we expect our leaders to give first priority to people who have formally joined the church (Galatians 6:10), and to serve those who only attend the church by referring them to another source of godly counsel." },
        { k: "h", t: "Confidentiality" },
        { k: "q", ref: "Proverbs 11:13", t: "A gossip betrays a confidence, but a trustworthy man keeps a secret." },
        { k: "p", t: "The Bible teaches that Christians should carefully guard any personal and private information that others reveal to them. Protecting confidences is a sign of Christian love and respect (Matthew 7:12). It also discourages harmful gossip (Proverbs 26:20), invites confession (Proverbs 11:13), and thus encourages people to seek needed counseling. Since these goals are essential to the ministry of the gospel and the work of the local church, all members and attenders are expected to refrain from gossip and to respect the confidences of others." },
        { k: "p", t: "In particular, our leaders will carefully protect all information that they receive through pastoral counseling. The elders, because they share the responsibility for the affairs of the church, may counsel with each other about how to care for the church as well as specific individuals. This is particularly necessary when:" },
        { k: "list", items: [
          "A pastor is uncertain how to counsel a person about a particular problem and needs to seek advice from other pastors, or from the leaders of the church that person attends (Proverbs 11:14)",
          "The person who disclosed the information, or any other person, is in imminent danger of serious harm unless others intervene (Proverbs 24:11–12)",
          "A person refuses to repent of sin and it becomes necessary to promote repentance through accountability and redemptive church discipline (Matthew 18:15–20)",
          "Leaders are required by law to report suspected abuse (Romans 13:1)"
        ] }
      ],
      check: {
        q: "What is the basis of counseling at Providence?",
        options: [
          "Licensed clinical psychotherapy",
          "Scriptural principles, offered by pastors and lay counselors who are not licensed clinicians",
          "A referral service to outside professionals only"
        ],
        answer: 1,
        why: "The church counsels from Scripture; those who counsel are not licensed mental health professionals unless they say otherwise."
      },
      reflect: ["Where in your life would you welcome counsel from someone in this church?"],
      discuss: "Who has given you the best counsel of your life, and why did it land?"
    },
    {
      n: 20,
      title: "Our Commitment to Peacemaking",
      standfirst: "Blessed are the peacemakers, for they will be called sons of God (Matt. 5:9).",
      mins: 3,
      url: "https://medium.com/@providencekc/our-commitment-to-peacemaking-c4a9fdc84386",
      passages: ["Matthew 5:9", "John 13:34–35", "Ephesians 4:29–32", "Colossians 3:12–14", "Matthew 7:3–5", "Proverbs 19:11", "1 Corinthians 13:7", "Matthew 5:23–24", "Matthew 18:15–20", "Galatians 6:1", "Psalm 141:5", "Philippians 2:3–4", "1 Corinthians 6:1–8"],
      body: [
        { k: "q", ref: "Matthew 5:9", t: "Blessed are the peacemakers, for they will be called sons of God." },
        { k: "p", t: "Our church is committed to building a “culture of peace” that reflects God’s peace and the power of the gospel of Christ in our lives. As we stand in the light of the cross, we realize that bitterness, unforgiveness and broken relationships are not appropriate for the people whom God has reconciled to himself through the sacrifice of his only Son (John 13:34–35; Ephesians 4:29–32; Colossians 3:12–14)." },
        { k: "p", t: "Therefore, we look to the Scriptures and the Holy Spirit for guidance on how we can respond to conflict in a way that will honor God, promote justice, reconcile relationships, and preserve our witness for Christ." },
        { k: "h", t: "Personal peacemaking" },
        { k: "list", items: [
          "Whenever we are faced with conflict, our primary goal will be to glorify God with our thoughts, words and actions (1 Corinthians 10:31)",
          "We will try to get the “logs” out of our own eyes before focusing on what others may have done wrong (Matthew 7:3–5)",
          "We will seek to overlook minor offenses (Proverbs 19:11)",
          "We will refrain from all gossip, backbiting and slander. If we have a problem with others, we will talk to them, not about them (Ephesians 4:29)",
          "We will make “charitable judgments” toward one another by believing the best about each other until we have facts that prove otherwise (1 Corinthians 13:7; James 4:11–12)",
          "If an offense is too serious to overlook, or if we think someone may have something against us, we will go promptly to seek reconciliation (Matthew 5:23–24; 18:15)",
          "When we offer a word of correction, we will do so humbly — realizing we are vulnerable to the same temptations — graciously and gently, with the goal of serving and restoring, rather than beating down (Proverbs 12:18; Ephesians 4:29; Galatians 6:1)",
          "When someone tries to correct us, we will ask God to help us resist prideful defensiveness and to welcome correction with humility (Psalm 141:5; Proverbs 15:32)",
          "When we discuss or negotiate substantive issues, we will look out for others’ interests as well as our own (Philippians 2:3–4)"
        ] },
        { k: "h", t: "Assisted peacemaking" },
        { k: "list", items: [
          "When two of us cannot resolve a conflict privately, we will seek the mediation of wise people in our church and listen humbly to their counsel (Matthew 18:16; Philippians 4:2–3)",
          "If our dispute is with a church leader, we will look to other leaders for assistance (1 Timothy 5:19–21)",
          "When informal mediation does not resolve a dispute, we will seek formal assistance from our church leaders or people they appoint, and we will submit to their counsel and correction (Matthew 18:17–20)",
          "If a person coming to our church has an unresolved conflict with someone in his former church, we will require and assist him to make every reasonable effort to be reconciled before joining our church (Matthew 5:23–24; Romans 12:18)"
        ] },
        { k: "p", t: "When a conflict involves matters of doctrine or church discipline, we will submit to the procedures set forth in our commitment to church discipline. If we have a legal dispute with or within our church and cannot resolve it internally through the steps given above, we will obey God’s command not to go into the civil court (1 Corinthians 6:1–8). Instead, we will submit to the duly appointed church courts as outlined in the Sovereign Grace Book of Church Order." },
        { k: "pull", t: "Above all, we pray that our ministry of peacemaking will bring praise to our Lord Jesus Christ and lead others to know his infinite love and peace." }
      ],
      check: {
        q: "What is the first goal named when conflict arises?",
        options: [
          "To win the argument",
          "To glorify God with our thoughts, words and actions",
          "To bring the matter to the elders immediately"
        ],
        answer: 1,
        why: "Everything else — logs in our own eyes, charitable judgments, going promptly — follows from that first aim."
      },
      reflect: ["Is there a relationship you need to make peace in before you take another step?"],
      discuss: "What is your instinct in conflict — fight, flee, or fix? What does the other person do?"
    }
  ]
};
