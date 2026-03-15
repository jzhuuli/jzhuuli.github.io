// js/projects.js
// Add or edit projects here. Each entry maps to an openProject() id.

const PROJECTS = {

    'customer-analytics': {
      eyebrow: '01 / Customer Analytics',
      title:   'Scalable Customer Interaction Analytics',
      tags:    ['Spark', 'AWS EMR', 'Python', 'ML Models'],
      github:  'YOUR_GITHUB_URL',
      body: `
        <h3>Overview</h3>
        <p>Engineered distributed data pipelines to process large-scale customer
        communication logs, enabling behavioral pattern analysis across millions
        of interactions.</p>
  
        <h3>Approach</h3>
        <ul>
          <li>Built <code>PySpark</code> ETL pipelines deployed on <code>AWS EMR</code>
              to handle terabyte-scale log data</li>
          <li>Reduced query runtime by <strong>50%</strong> through partition pruning
              and caching strategies</li>
          <li>Trained clustering models to segment customers by interaction behavior</li>
        </ul>
  
        <h3>Key code</h3>
        <pre><code># Spark pipeline — read and partition logs
  df = spark.read.parquet("s3://bucket/logs/")
  df = df.filter(col("event_type") == "interaction") \\
         .withColumn("date", to_date("timestamp")) \\
         .repartition("date")
  
  # Feature engineering
  df_features = df.groupBy("customer_id").agg(
      count("event_id").alias("total_interactions"),
      avg("response_time").alias("avg_response_time"),
      countDistinct("channel").alias("channel_diversity")
  )</code></pre>
  
        <h3>Outcomes</h3>
        <ul>
          <li>50% improvement in query runtime vs. previous SQL-based approach</li>
          <li>Identified 4 distinct customer behavior segments</li>
          <li>Insights used to inform customer success team outreach strategy</li>
        </ul>
      `
    },
  
    'fraud-detection': {
      eyebrow: '02 / Fraud Detection',
      title:   'Enterprise Fraud Detection Capstone',
      tags:    ['Random Forest', 'XGBoost', 'Python', 'Tableau'],
      github:  'YOUR_GITHUB_URL',
      body: `
        <h3>Overview</h3>
        <p>Built an end-to-end fraud detection system for credit card transactions
        using ensemble ML models, with business-facing reporting for non-technical
        stakeholders.</p>
  
        <h3>Approach</h3>
        <ul>
          <li>Trained <code>Random Forest</code> and <code>XGBoost</code> classifiers
              on imbalanced transaction data using SMOTE oversampling</li>
          <li>Tuned decision thresholds to optimize the precision/recall tradeoff
              for fraud use cases</li>
          <li>Built Tableau dashboards surfacing fraud signals by region, merchant
              category, and time of day</li>
        </ul>
  
        <h3>Key code</h3>
        <pre><code>from xgboost import XGBClassifier
  from sklearn.metrics import classification_report
  
  model = XGBClassifier(
      n_estimators=300,
      max_depth=6,
      scale_pos_weight=fraud_ratio,
      eval_metric='aucpr'
  )
  model.fit(X_train, y_train,
            eval_set=[(X_val, y_val)],
            early_stopping_rounds=20)
  
  print(classification_report(y_test, model.predict(X_test)))</code></pre>
  
        <h3>Outcomes</h3>
        <ul>
          <li>AUC-PR of 0.91 on held-out test set</li>
          <li>Reduced false positive rate by 18% vs. rule-based baseline</li>
          <li>Business report adopted by stakeholders for monthly fraud reviews</li>
        </ul>
      `
    },
  
    'fintech': {
    eyebrow: '04 / FinTech',
    title:   'Data-Driven Credit Card Design — FiTech',
    tags:    ['Logistic Regression', 'CLV Optimization', 'Python', 'Pandas', 'Statistical Power'],
    github:  'YOUR_GITHUB_URL',
    body: `
        <h3>Overview</h3>
        <p>FiTech, a fintech company, needed to decide which of 12 credit card product
        variations to offer across 750,000 prospects in an upcoming email solicitation.
        Products varied across three dimensions: APR (14.9, 16.8, 19.8), annual fee
        ($0 or $20), and fixed vs. variable rate. The goal was to maximize profitability
        by matching the right product to the right customer segment.</p>

        <h3>Approach</h3>
        <ul>
        <li>Analyzed historical solicitation data from 14 prior campaigns using
            <code>logistic regression</code> with interaction terms
            (<code>apr:bk_score</code>, <code>apr:fixed_var</code>) to model
            response rates per product and BK score segment</li>
        <li>Used <code>Exhibit 2</code> CLV estimates — ranging from $2 (BK 250,
            no-fee, 14.9% fixed) to $141 (BK 150, variable, 19.8%) — to calculate
            expected revenue per email</li>
        <li>Ran a statistical power analysis to determine minimum sample sizes
            (14,492 emails per product) needed to detect a 0.5% difference in
            response rates at 80% power</li>
        <li>Built a grid search over email volumes to balance profit, precision,
            and audience preservation for the Round 1 test campaign</li>
        </ul>

        <h3>Logistic regression model</h3>
        <pre><code>clf = rsm.model.logistic(
        data={"exhibits": exhibit_melt},
        rvar="resp",
        lev="resp",
        evar=["apr", "annual_fee", "fixed_var", "bk_score"],
        weights="freq",
        ivar=["apr:bk_score", "apr:fixed_var"]
    )
    # AUC: 0.662 | McFadden R²: 0.033
    # Key finding: annual fee $20 reduces odds by 70.8%
    # Variable rate reduces odds by 25.7%</code></pre>

        <h3>Profit optimization</h3>
        <pre><code># Revenue per product per BK segment
    merged_df['revenue_150'] = (
        emails_sent_150
        * merged_df['avg_resp_150']
        * merged_df['clv_150']
    )

    # Total across all 12 products and 3 BK segments
    # Total emails sent:  173,928
    # Total email cost:   $86,964
    # Product dev cost:   $21,000
    # Total revenue:      $203,193
    # Total profit:       $116,229</code></pre>

        <h3>Outcomes</h3>
        <ul>
        <li>Top product: <strong>Product 4</strong> (14.9% Variable, no fee) —
            highest response rate (~4.3–5.9% across segments) driven by low APR
            and no annual fee</li>
        <li>Optimal Round 1 test volume: <strong>146,369 emails</strong> (80.5%
            audience preserved for rollout)</li>
        <li>Identified that no-fee products consistently outperformed $20 fee
            products in response rate, while higher APR products yielded higher
            CLV — creating a tension resolved by BK score targeting</li>
        <li>Total projected profit across all 12 products: <strong>$116,229</strong>
            on $107,964 in total costs</li>
        </ul>
    `
    },
  
    'smobile': {
      eyebrow: '05 / Churn Prediction',
      title:   'Predicting Customer Churn — S-Mobile',
      tags:    ['Logistic Regression', 'Churn Prediction', 'Customer Retention', 'CLV Analysis'],
      github:  'YOUR_GITHUB_URL',
      body: `
        <h3>Overview</h3>
        <p>Built churn prediction models for Singapore's leading cellphone carrier
        to proactively identify at-risk customers and quantify the ROI of retention
        interventions.</p>
  
        <h3>Approach</h3>
        <ul>
          <li>Trained logistic regression and ensemble models on usage, billing,
              and support interaction features</li>
          <li>Scored customers by churn probability and CLV to prioritize outreach</li>
          <li>Modeled economic impact of targeted retention offers per segment</li>
        </ul>
  
        <h3>Key code</h3>
        <pre><code>from sklearn.linear_model import LogisticRegression
  from sklearn.preprocessing import StandardScaler
  
  scaler = StandardScaler()
  X_scaled = scaler.fit_transform(X_train)
  
  lr = LogisticRegression(C=0.5, class_weight='balanced')
  lr.fit(X_scaled, y_train)
  
  # Score and rank by churn risk × CLV
  df['churn_prob'] = lr.predict_proba(X_test)[:, 1]
  df['priority_score'] = df['churn_prob'] * df['clv']
  df.sort_values('priority_score', ascending=False)</code></pre>
  
        <h3>Outcomes</h3>
        <ul>
          <li>Model AUC of 0.84 on test set</li>
          <li>Top-decile targeting captured 60% of actual churners</li>
          <li>Retention strategy projected to recover $2.1M in annual revenue</li>
        </ul>
      `
    },
  
    'intuit': {
      eyebrow: '06 / Marketing Analytics',
      title:   'QuickBooks Upgrade Campaign — Intuit',
      tags:    ['Response Modeling', 'Campaign Optimization', 'Targeting Strategy', 'Marketing Analytics'],
      github:  'YOUR_GITHUB_URL',
      body: `
        <h3>Overview</h3>
        <p>Analyzed response patterns from 75,000 businesses to build a targeting
        model for Intuit's QuickBooks 3.0 upgrade mailing campaign, optimizing
        wave-2 spend efficiency.</p>
  
        <h3>Approach</h3>
        <ul>
          <li>Analyzed wave-1 response data to identify firm characteristics
              predictive of upgrade likelihood</li>
          <li>Built response model to score all 75K prospects for wave-2 targeting</li>
          <li>Developed decile-based mailing strategy to optimize budget allocation</li>
        </ul>
  
        <h3>Outcomes</h3>
        <ul>
          <li>Top 3 deciles captured 2.4× the response rate of untargeted mailing</li>
          <li>Recommended targeting strategy reduced cost-per-conversion by 31%</li>
          <li>Analysis presented as final business recommendation to Intuit stakeholders</li>
        </ul>
      `
    }
  
  };