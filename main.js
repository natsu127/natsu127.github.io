'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    // #result直下のpを取得しscoreLabelという定数に代入
    const scoreLabel = document.querySelector('#result > p');


    // クイズのデータを配列で管理する
    // キーと値で管理する連想配列を複数つくり配列で管理する
    // 問題文のキーはq,回答のキーはcで持っておく
    // のちに定義した配列をシャッフルする関数により、quizSetに代入する前に配列をシャッフルすることで
    // 問題の出題される順番もシャッフルした
    const quizSet = shuffle([
        { q: 'どちらが有利？', c: ['後手', '先手', 'どちらでもない'],img:  'https://natsu127.github.io/04-04a.png'},
        { q: 'どちらが有利？', c: ['後手', '先手', 'どちらでもない'],img:  'https://natsu127.github.io/04-04b.png' },
        { q: 'どちらが有利？', c: ['後手', 'どちらでもない', '先手'], img: 'https://natsu127.github.io/04-04c.png' },
        { q: 'どちらが有利？', c: ['後手', 'どちらでもない', '先手'], img: 'https://natsu127.github.io/04-05a.png' },
        { q: 'どちらが有利？', c: ['後手', 'どちらでもない', '先手'], img: 'https://natsu127.github.io/04-01b.png' },
        { q: 'どちらが有利？', c: ['後手', 'どちらでもない', '先手'],img:  'https://natsu127.github.io/04-01c.png' },
        { q: 'どちらが有利？', c: ['先手', 'どちらでもない', '後手'],img:  'https://natsu127.github.io/04-08a.png' },
        { q: 'どちらが有利？', c: ['先手', 'どちらでもない', '後手'],img:  'https://natsu127.github.io/04-08b.png' },
        { q: 'どちらが有利？', c: ['先手', 'どちらでもない', '後手'],img:  'https://natsu127.github.io/04-08c.png' },
        { q: 'どちらが有利？', c: ['どちらでもない', '先手', '後手'],img:  'https://natsu127.github.io/04-09a.png' },
        { q: 'どちらが有利？', c: ['先手', 'どちらでもない', '後手'],img:  'https://natsu127.github.io/04-09b.png' },
        { q: 'どちらが有利？', c: ['どちらでもない', '先手', '後手'],img:  'https://natsu127.github.io/04-10a.png' },
    ]);
    // 現在何問目かを管理する変数
    let currentNum = 0;
    // 回答したかどうかを管理する変数
    let isAnswered;
    // 正答数を管理する変数
    let score = 0;

    // シャッフルする処理をするものを関数にする
    // 引数にある配列を渡したらその配列の中身をシャッフルしてくれてシャッフル後の配列を返してくれる
    // フィーシャー・イェーツのシャッフルと呼ばれるアルゴリズムを使用
    // 範囲を狭めながら最後の要素とランダムに選んだ要素を入れ替えていくというもの

    function shuffle(arr) {
        // ランダムに選ぶ範囲の終点のインデックスをiという変数に
        // ランダムに選ばれた要素のインデックスをjという変数にした
        // for文によりiが0より大きい間は繰り返し処理を行なわせる

        for (let i = arr.length - 1; i > 0; i--) {
            // 乱数を使うことでランダムにインデックスを選択する
            // jは0からi番目のランダムな整数値にする
            const j = Math.floor(Math.random() * (i + 1));
            // ランダムに選ばれたjと選択範囲の終点のiのインデックスをもつ配列の要素を入れ替える
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }

        // シャッフルされた配列を返す
        return arr;
    }

    // 正誤判定をする関数
    // quizSetのインデックスが0番目のとき正解それ以外だと不正解とする
    function checkAnswer(li) {
        // もし既にisAnsweredがtrueであればそれ以降の処理は行なわせないためにreturnとした
        // === trueは省略可
        if (isAnswered === true) {
            return;
        }
        // 回答されたタイミングでisAnsweredをtrueにした
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]) {
            // 正解の場合はcorrectというクラスをつける
            // scoreの数値をひとつ増やす
            li.classList.add('correct');
            score++;
        } else {
            // 不正解の場合はwrongというクラスをつける
            li.classList.add('wrong')
        }

        // 回答された時点でdisabledクラスを外し、次に進めるようなデザインに戻した
        btn.classList.remove('disabled');
    }

   



    // 問題文と回答文を表示するための処理をひとつの関数にまとめた
    function setQuiz() {

        // 最初に表示した時点では回答されていないためisAnsweredをfalseにした
        isAnswered = false;


         // mainの画像を配置
         // 表示する領域をmainImageという名前で扱えるようにした
         const mainImage = document.getElementById('main');
         // src属性にimagesのcurrentIndex番目の要素を代入
          mainImage.src = quizSet[currentNum].img;

        // currentNum番目の問題文を取得し表示させる。クイズのデータは配列で管理されているため、
        // 何番目のどのキーに対する値かを示せば取得できる。今回は.qにより問題文の値を取得した
        question.textContent = quizSet[currentNum].q;

        // choicesの最初の子要素がある限り子要素を消す
        // これにより前回の問題の選択肢を消すことができる
        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
        // 定義したシャッフルするための関数に回答文の配列を引数に渡すことで回答文をシャッフルさせた
        // シャッフルされた問題文を新たに変数として宣言
        // このままでは元の関数までシャッフルされてしまい、最初の問題を正解にする今回のアプリでは
        // 正誤判定ができなくなってしまう
        // const shuffledChoices = shuffle(quizSet[currentNum].c)
        // [...]を加えることで元の配列はそのままに選択しをシャッフルできる
        const shuffledChoices = shuffle([...quizSet[currentNum].c])


        // currentNum番目の回答文を表示させる
        // quizSet[currentNum].cでcurrentNum番目の回答文の配列を指定し、.forEachにより繰り返し処理を行う
        // 回答文はそれぞれliで囲う
        // まずひとつひとつの値をchoiceという名前のもので受け取る
        // li要素を作り次にliにchoiceを代入することでli要素に文を追加
        // 最後に.appendChildによりchoicesに追加した

        // quizSet[currentNum].c.forEach(choice => {   シャッフルされたものに変更
        shuffledChoices.forEach(choice => {
            // <li></li>を作成
            const li = document.createElement('li');
            // <li>回答文</li>を作成
            li.textContent = choice;
            // htmlのchoicesに今作ったliを代入
            li.addEventListener('click', () => {
                // 正誤判定をしてくれるcheckAnswerという既に定義した関数を呼び出す
                checkAnswer(li);
            });
            choices.appendChild(li);
            // 繰り返し処理を行なう
        });


        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'show Score';
        }
    }

    setQuiz();

    btn.addEventListener('click', () => {
        // 回答していない状態でNextをクリックしても次に進ませないようにする
        if (btn.classList.contains('disabled')) {
            return;
        }

        // クリックして次に進んだ場合disabledクラスをつけ、押せないようなスタイルにする
        btn.classList.add('disabled');

        // 最後の問題までいったら分岐させ、正答数を表示する
        if (currentNum === quizSet.length - 1) {
            // console.log(`Score: ${score} / ${quizSet.length}`);
            // #resultの直下のpを取得した定数に正答数を表示するものを代入する
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    });
  
}
