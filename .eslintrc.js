module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    env:{
        node:true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true
        }],
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "no-public"
        }],
        "@typescript-eslint/typedef": ["error", {
            parameter: true,
            variableDeclaration: true,
            memberVariableDeclaration: true,
            propertyDeclaration: true,
            arrowParameter: true,
            callSignature: true,
            arrowCallSignature: true,
            // permet de ne pas vérifier le typage des destructurations
            destructuring: true,
            // permet de ne pas vérifier les types des variables déclarées à l'intérieur de boucles for
            variableDeclarationIgnoreForLoop: true,
            // permet de ne pas vérifier les déclarations de fonction
            "variableDeclarationIgnoreFunction": true
        }],
        "eqeqeq": ["error", "always", {
            null: "ignore"
        }],
        "@typescript-eslint/array-type": ["error", {
            default: "array-simple",
            readonly: "array-simple"
        }],
        "prefer-arrow-callback": "error",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error"
    }
};
