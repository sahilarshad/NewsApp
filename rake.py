#In console, do the below commands ->
    # pip install --user --rake-nltk
    # python3 -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"     --> You can use python or python3 at the start


from rake_nltk import Rake

input_text = '''In terms of value, it’s tough to beat Apple Arcade. The service costs $5 per month following a one-month free trial, or comes as part of an Apple One subscription. Heck, if you bought an Apple device recently, like an iPhone 15, you get three months of Apple Arcade free. But whether you’re rocking your free trial, or you actively subscribe, you’ll soon have four new games to check out.

Apple announced the upcoming titles today, Tuesday, Oct. 3, which will be launching throughout October. First up is Jeopardy! World Tour+, essentially a game of Jeopardy!, which comes out Oct. 6. This version of Jeopardy! comes with “thousands of categories,” according to Apple, so hopefully you won’t run into any repeats for a while. At least if you do, you can try to impress your friends with your trivia knowledge.

One week after Jeopardy! World Tour+’s release, Apple will launch Cut the Rope 3, the latest in the Cut the Rope franchise. The main focus in the announcement is on the adventure element of the game, following the protagonist On Nom and sidekick Nibble Nom exploring the world and discovering new species of “Nommies.” Apple’s cagey with the specifics on this one, but it’s safe to say you’ll play through your fair share of physics-based puzzles. This one comes out Oct. 13.

Once you’re done with Cut the Rope 3, Crossword Jam+ launches Oct. 20. Apple advertises this one as a relaxing title: You swipe on letters to make words and solve puzzles, overlayed on top of natural scenery backgrounds. I can see this type of game being good for kicking back after a long day or on your commute home.

Finally, and arguably most exciting, NBA 2K24 Arcade Edition will launch on Oct. 24. You can play as an NBA champ in the MyCAREER mode, earning both fans and endorsements alike. (Of course, you can customize your player with plenty of branded items like shoes, accessories, clothes, and tattoos.) You can play against AI players, build a team of legacy players, or play games courtside that mirror games from the actual NBA season. Plus, you can customize your personal basketball court, and invite friends over to check it out.

As per usual, you can play any Apple Original title on iPhone, iPad, Mac, and Apple TV. Any titles labeled “App Store Greats” are only available on iPhone and iPad'''

# with open('keyword.txt') as f:
#     input_text = f.readlines()

input_text = input_text.replace("(", "").replace("(", "")

rake = Rake()
rake.extract_keywords_from_text(input_text)
keywords = rake.get_ranked_phrases()
print(set([keyword for keyword in keywords if len(keyword.split()) > 1]))